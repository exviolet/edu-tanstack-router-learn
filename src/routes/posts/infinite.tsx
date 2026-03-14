import { createFileRoute } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";

import { postKeys } from "../../api/queryKeys";

export const Route = createFileRoute("/posts/infinite")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: postKeys.infinite(),
      queryFn: async ({ pageParam }) => {
        const res = await fetch(
          `http://localhost:3001/api/posts?page=${pageParam}&limit=3`,
        );
        const posts = await res.json();
        return posts;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const loaded = allPages.length * lastPage.limit;
        return loaded < lastPage.total ? allPages.length + 1 : undefined;
      },
    });

  const posts = data?.pages.flatMap((page) => page.posts);

  return (
    <div>
      {isPending && <div>Загрузка...</div>}
      {posts?.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
      {hasNextPage && (
        <button disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
          Загрузить ещё
        </button>
      )}
    </div>
  );
}
