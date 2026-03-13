import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/dashboard")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },

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
