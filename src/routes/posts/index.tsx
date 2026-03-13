import { createFileRoute } from "@tanstack/react-router";
import { PostCard } from "./-components/PostCard";

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
});

function RouteComponent() {
  const posts = [
    { id: 1, title: "Первый пост" },
    { id: 2, title: "Второй пост" },
    { id: 3, title: "Третий пост" },
  ];

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}
