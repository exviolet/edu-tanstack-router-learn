import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
        <Link
          to="/"
          activeOptions={{ exact: true }}
          activeProps={{ style: { fontWeight: "bold", color: "blue" } }}
          inactiveProps={{ style: { color: "gray" } }}
        >
          Home
        </Link>
        <Link
          to="/posts"
          activeProps={{ style: { fontWeight: "bold", color: "blue" } }}
          inactiveProps={{ style: { color: "gray" } }}
        >
          Posts
        </Link>
        <Link
          to="/about"
          activeProps={{ style: { fontWeight: "bold", color: "blue" } }}
          inactiveProps={{ style: { color: "gray" } }}
        >
          About
        </Link>
        <Link
          to="/contacts"
          activeProps={{ style: { fontWeight: "bold", color: "blue" } }}
          inactiveProps={{ style: { color: "gray" } }}
        >
          Contacts
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
