import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { postKeys } from "../../api/queryKeys";
import { PostCard } from "./-components/PostCard";
import { PostsError } from "./-components/PostsError";

export const Route = createFileRoute("/posts/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Math.max(Number(search.page) || 1, 1),
      filter: (search.filter as string) || "",
      sort: search.sort === "desc" ? ("desc" as const) : ("asc" as const),
    };
  },

  errorComponent: PostsError,
  pendingMs: 200,
  pendingComponent: () => <div>Загрузка постов...</div>,

  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPlaceholderData, isPending, isFetching, isError, error } =
    useQuery({
      queryKey: postKeys.all,
      queryFn: async () => {
        const res = await fetch("http://localhost:3001/api/posts");
        if (!res.ok) throw new Error("Ошибка загрузки");
        return res.json() as Promise<{
          posts: { id: number; title: string }[];
          total: number;
        }>;
      },
      placeholderData: keepPreviousData,
    });

  if (isPending) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка: {error.message}</div>;

  const navigate = useNavigate();
  const { page, filter, sort } = Route.useSearch();

  const filteredPosts = data.posts.filter((post) =>
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
      <h1>
        Страница {page}{" "}
        {isFetching && <span style={{ fontSize: "14px" }}>Обновление...</span>}
      </h1>

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
        <ul style={{ opacity: isPlaceholderData ? 0.5 : 1 }}>
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
