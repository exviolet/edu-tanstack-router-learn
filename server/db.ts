export type Post = {
  id: number;
  title: string;
  body: string;
};

let nextId = 11;

const posts: Post[] = [
  { id: 1, title: "Первый пост", body: "Содержимое первого поста" },
  { id: 2, title: "Второй пост", body: "Содержимое второго поста" },
  { id: 3, title: "Третий пост", body: "Содержимое третьего поста" },
  { id: 4, title: "Четвертый пост", body: "Содержимое четвертого поста" },
  { id: 5, title: "Пятый пост", body: "Содержимое пятого поста" },
  { id: 6, title: "Шестой пост", body: "Содержимое шестого поста" },
  { id: 7, title: "Седьмой пост", body: "Содержимое седьмого поста" },
  { id: 8, title: "Восьмой пост", body: "Содержимое восьмого поста" },
  { id: 9, title: "Девятый пост", body: "Содержимое девятого поста" },
  { id: 10, title: "Десятый пост", body: "Содержимое десятого поста" },
];

export function getPosts(page?: number, limit?: number) {
  if (page !== undefined && limit !== undefined) {
    const start = (page - 1) * limit;
    return {
      posts: posts.slice(start, start + limit),
      total: posts.length,
      page,
      limit,
    };
  }
  return { posts, total: posts.length };
}

export function getPost(id: number) {
  return posts.find((p) => p.id === id);
}

export function createPost(data: { title: string; body: string }) {
  const post: Post = { id: nextId++, ...data };
  posts.push(post);
  return post;
}

export function updatePost(id: number, data: { title?: string; body?: string }) {
  const post = posts.find((p) => p.id === id);
  if (!post) return null;
  if (data.title !== undefined) post.title = data.title;
  if (data.body !== undefined) post.body = data.body;
  return post;
}

export type Comment = {
  id: number;
  postId: number;
  author: string;
  text: string;
};

const comments: Comment[] = [
  { id: 1, postId: 1, author: "Анна", text: "Отличный пост!" },
  { id: 2, postId: 1, author: "Борис", text: "Спасибо за информацию" },
  { id: 3, postId: 2, author: "Виктор", text: "Интересная тема" },
  { id: 4, postId: 3, author: "Анна", text: "Жду продолжения" },
  { id: 5, postId: 5, author: "Галина", text: "Очень полезно!" },
];

export function getCommentsByPostId(postId: number) {
  return comments.filter((c) => c.postId === postId);
}

export function getStats() {
  return {
    totalPosts: posts.length,
    totalComments: comments.length,
    avgCommentsPerPost: +(comments.length / posts.length).toFixed(1),
  };
}

export function deletePost(id: number) {
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return false;
  posts.splice(index, 1);
  return true;
}
