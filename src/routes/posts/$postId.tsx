import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { useQuery } from "@tanstack/react-query";
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

  return (
    <div>
      <button
        onClick={() => navigate({ to: "/posts" })}
        style={{ marginBottom: "1rem" }}
      >
        ← Назад к списку
      </button>

      {isPending && <div>Загрузка поста...</div>}
      {isError && <div>Ошибка загрузки поста</div>}
      {post && <h3>{post.title}</h3>}
      {post && <p>ID поста: {id}</p>}
      {post && <p>{post.body}</p>}
    </div>
  );
}
