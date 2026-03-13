import { useRouter } from "@tanstack/react-router";

export function PostsError({ error }: { error: Error }) {
  const router = useRouter();
  return (
    <div style={{ color: "red", padding: "1rem", border: "1px solid red" }}>
      <p>Ошибка: {error.message}</p>
      <button onClick={() => router.invalidate()}>🔄 Повторить загрузку</button>
    </div>
  );
}
