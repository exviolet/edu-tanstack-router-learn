import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { fetchPost } from "../../posts";

export const Route = createFileRoute("/posts/$postId")({
  loader: ({ params }) => fetchPost(params.postId),
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = Route.useParams();
  const navigate = useNavigate();

  const post = Route.useLoaderData();

  if (!post) return <div>Пост не найден</div>;

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
