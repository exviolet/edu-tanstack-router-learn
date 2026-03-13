import { createFileRoute, useNavigate, notFound } from "@tanstack/react-router";
import { fetchPost } from "../../posts";
import { PostsError } from "../posts/-components/PostsError";

export const Route = createFileRoute("/posts/$postId")({
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId);
    if (!post) {
      throw notFound();
    }
    return post;
  },
  notFoundComponent: () => <div>Пост не найден</div>,
  errorComponent: PostsError,
  pendingMs: 200,
  pendingComponent: () => <div>Загрузка поста...</div>,
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = Route.useParams();
  const navigate = useNavigate();

  const post = Route.useLoaderData();

  return (
    <div>
      <button
        onClick={() => navigate({ to: "/posts" })}
        style={{ marginBottom: "1rem" }}
      >
        ← Назад к списку
      </button>

      <h3>{post.title}</h3>
      <p>ID поста: {postId}</p>
    </div>
  );
}
