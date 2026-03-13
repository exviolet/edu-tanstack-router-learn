import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/dashboard")({
  loader: ({ context }) => {
    return { message: `Привет, ${context.auth.username}` };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  return (
    <div style={{ flex: 1, marginLeft: 50 }}>
      {" "}
      <h3>{data.message}</h3>
      Панель управления
    </div>
  );
}
