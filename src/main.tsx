import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { auth } from "./auth";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
});

const router = createRouter({
  routeTree,
  defaultPendingMs: 300,
  defaultPendingMinMs: 500,
  defaultPendingComponent: () => <div>Загрузка...</div>,
  context: { auth, queryClient },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
}
