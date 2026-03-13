import { createFileRoute, Link } from "@tanstack/react-router";
import { PostCard } from "./-components/PostCard";

export const Route = createFileRoute("/posts/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Math.max(Number(search.page) || 1, 1),
      filter: (search.filter as string) || undefined,
    };
  },

  component: RouteComponent,
});

function RouteComponent() {
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

  const { page, filter } = Route.useSearch();

  const perPage = 3;
  const start = (page - 1) * perPage;
  const slicedPosts = posts.slice(start, start + perPage);
  const hasNextPage = start + perPage < posts.length;

  return (
    <div>
      <h1>Страница {page}</h1>

      <ul>
        {slicedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        {page > 1 && (
          <Link
            to="/posts"
            search={(prev) => ({ ...prev, page: prev.page - 1 })}
          >
            ← Назад
          </Link>
        )}

        {hasNextPage && (
          <Link
            to="/posts"
            search={(prev) => ({ ...prev, page: prev.page + 1 })}
          >
            Вперед →
          </Link>
        )}
      </div>
    </div>
  );
}
