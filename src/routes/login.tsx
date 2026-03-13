import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect: (search.redirect as string) || undefined,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate({ to: redirect || "/dashboard" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Вход в систему</h3>
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
}
