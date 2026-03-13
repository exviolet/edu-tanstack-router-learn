import "../../app.css";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PostCard } from "./-components/PostCard";

export const Route = createFileRoute("/posts/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Math.max(Number(search.page) || 1, 1),
      filter: (search.filter as string) || "",
      sort: search.sort === "desc" ? ("desc" as const) : ("asc" as const),
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

  const navigate = useNavigate();
  const { page, filter, sort } = Route.useSearch();

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(filter.toLowerCase()),
  );

  const sortedPosts = [...filteredPosts].sort((a, b) =>
    sort === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title),
  );

  const perPage = 3;
  const start = (page - 1) * perPage;
  const slicedPosts = sortedPosts.slice(start, start + perPage);
  const hasNextPage = start + perPage < sortedPosts.length;

  return (
    <div>
      <h1>Страница {page}</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>Поиск: </label>
        <input
          type="text"
          value={filter}
          placeholder="Введите название..."
          onChange={(e) =>
            navigate({
              search: (prev) => ({ ...prev, filter: e.target.value, page: 1 }),
            })
          }
        />
        <label>Сортировка: </label>
        <select
          value={sort}
          onChange={(e) =>
            navigate({
              search: (prev) => ({ ...prev, sort: e.target.value }),
            })
          }
        >
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </div>

      {slicedPosts.length > 0 ? (
        <ul>
          {slicedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </ul>
      ) : (
        <p>Ничего не найдено</p>
      )}

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        {page > 1 && (
          <Link
            className="nav-link"
            to="/posts"
            search={(prev) => ({ ...prev, page: prev.page - 1 })}
          >
            ← Назад
          </Link>
        )}

        {hasNextPage && (
          <Link
            className="nav-link"
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
