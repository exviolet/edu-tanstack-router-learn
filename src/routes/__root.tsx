import "../app.css";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  notFoundComponent: () => (
    <div>
      <h2>404 — Страница не найдена</h2>
      <Link to="/">На главную</Link>
    </div>
  ),
  component: () => (
    <>
      <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
        <Link to="/" activeOptions={{ exact: true }} className="nav-link">
          Home
        </Link>
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
        <Link
          to="/posts"
          className="nav-link"
          preload="intent"
          preloadDelay={200}
        >
          Posts
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
        <Link to="/contacts" className="nav-link">
          Contacts
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
