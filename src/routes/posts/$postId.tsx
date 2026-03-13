import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = Route.useParams();

  const posts = [
    { id: 1, title: "Первый пост" },
    { id: 2, title: "Второй пост" },
    { id: 3, title: "Третий пост" },
    { id: 4, title: "Четвертый пост" },
    { id: 5, title: "Пятый пост" },
    { id: 6, title: "Шестой пост" },
    { id: 7, title: "Седьмой пост" },
    { id: 8, title: "Восьмой пост" },
    { id: 9, title: "Девятый пост" },
    { id: 10, title: "Десятый пост" },
  ];

  const post = posts.find((p) => p.id === Number(postId));

  if (!post) {
    return <div> Пост не найден </div>;
  }

  return (
    <div>
      {" "}
      <h3>{post.title}</h3>
      <p>Пост #{postId}</p>
    </div>
  );
}
