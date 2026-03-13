import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div style={{ flex: 1, marginLeft: 50 }}>Панель управления</div>;
}
