import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { postKeys } from "../../api/queryKeys";
import { PostsError } from "../posts/-components/PostsError";

export const Route = createFileRoute("/posts/$postId")({
  notFoundComponent: () => <div>Пост не найден</div>,
  errorComponent: PostsError,
  pendingMs: 200,
  pendingComponent: () => <div>Загрузка поста...</div>,
  component: RouteComponent,
});

function RouteComponent() {
  const { postId: id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: post,
    isPending,
    isError,
  } = useQuery({
    queryKey: postKeys.detail(Number(id)),
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/posts/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch post");
      }
      return res.json();
    },
  });

  const [showComments, setShowComments] = useState(false);

  const {
    data: comments,
    isFetching,
    isError: commentsError,
  } = useQuery({
    queryKey: postKeys.comments(Number(id)),
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/posts/${id}/comments`);
      if (!res.ok) {
        throw new Error("Failed to fetch comments");
      }
      return res.json();
    },
    enabled: showComments,
  });

  const {
    mutate,
    error,
    isPending: isDeleting,
  } = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`http://localhost:3001/api/posts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete post");
      }
      return res.json();
    },
    onError: (error) => {
      alert("Не удалось удалить пост: " + error.message);
    },
    onSuccess: () => {
      navigate({ to: "/posts" });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
    retry: 1,
  });

  return (
    <div>
      <button
        onClick={() => navigate({ to: "/posts" })}
        style={{ marginBottom: "1rem" }}
      >
        ← Назад к списку
      </button>

      <button disabled={isDeleting} onClick={() => mutate(Number(id))}>
        {isDeleting ? "Удаление..." : "Удалить пост"}
      </button>

      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? "Скрыть" : "Показать"} комментарии
      </button>

      {isPending && <div>Загрузка поста...</div>}
      {isError && <div>Ошибка загрузки поста</div>}
      {post && (
        <div>
          <h3>{post.title}</h3>
          <p>ID поста: {id}</p>
          <p>{post.body}</p>
        </div>
      )}

      {showComments && (
        <div style={{ marginTop: "1rem" }}>
          <h4>Комментарии</h4>
          {isFetching && <div>Загрузка комментариев...</div>}
          {commentsError && <div>Ошибка загрузки комментариев</div>}
          {comments &&
            comments.map((comment) => (
              <div key={comment.id} style={{ marginBottom: "8px" }}>
                <strong>{comment.author}</strong>
                <p>{comment.text}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
