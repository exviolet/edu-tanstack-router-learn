export type Post = {
  id: number;
  title: string;
};

const posts: Post[] = [
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

export async function fetchPosts(): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return posts;
}

export async function fetchPost(id: string): Promise<Post | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return posts.find((post) => post.id === Number(id));
}
