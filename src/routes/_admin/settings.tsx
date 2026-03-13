import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div style={{ flex: 1, marginLeft: 50 }}>Настройки</div>;
}
