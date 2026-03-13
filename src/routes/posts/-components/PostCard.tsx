import "../../../app.css";
import { Link } from "@tanstack/react-router";

export function PostCard({ post }: { post: { id: number; title: string } }) {
  return (
    <div
      style={{ border: "1px solid #ccc", padding: "8px", marginBottom: "8px" }}
    >
      <Link
        className="nav-link"
        to="/posts/$postId"
        params={{ postId: String(post.id) }}
      >
        <h3>{post.title}</h3>
      </Link>
    </div>
  );
}
export default PostCard;
