import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { postKeys } from "../../api/queryKeys";

export const Route = createFileRoute("/posts/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    data: postsData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: postKeys.all,
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/posts`);
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      return res.json();
    },
  });

  const {
    data: stats,
    isPending: statsPending,
    isError: isStatsError,
    error: statsError,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/stats`);
      if (!res.ok) {
        throw new Error("Failed to fetch stats");
      }
      return res.json();
    },
  });

  return (
    <div>
      {isPending && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {postsData && postsData.posts.length === 0 && <p>No posts found</p>}
      {postsData && postsData.posts.length > 0 && (
        <ul>
          {postsData.posts.slice(0, 3).map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}

      {statsPending && <p>Loading stats...</p>}
      {isStatsError && <p>Error:{statsError.message}</p>}
      {stats && (
        <div>
          <p>Total posts: {stats.totalPosts}</p>
          <p>Total comments: {stats.totalComments}</p>
          <p>Total avgCommentsPerPost: {stats.avgCommentsPerPost}</p>
        </div>
      )}
    </div>
  );
}
