export const postKeys = {
  all: ["posts"] as const,
  list: (filters?: { page?: number; filter?: string }) =>
    filters ? ([...postKeys.all, filters] as const) : postKeys.all,

  detail: (id: number) => [...postKeys.all, id] as const,
};
