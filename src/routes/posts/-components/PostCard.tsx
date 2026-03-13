export function PostCard({ post }: { post: { id: number; title: string } }) {
  return (
    <div
      style={{ border: "1px solid #ccc", padding: "8px", marginBottom: "8px" }}
    >
      <h3>{post.title}</h3>
    </div>
  );
}
export default PostCard;
