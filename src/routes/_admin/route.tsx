import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div style={{ display: "flex" }}>
      <aside
        style={{
          width: "150px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          borderRight: "2px solid #ccc",
        }}
      >
        <h3>Панель</h3>
        <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {" "}
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>{" "}
          <Link className="nav-link" to="/settings">
            Settings
          </Link>{" "}
        </nav>
      </aside>
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
