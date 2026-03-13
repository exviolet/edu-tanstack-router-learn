import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/posts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2>Блог</h2>

      <Outlet />
    </div>
  );
}
