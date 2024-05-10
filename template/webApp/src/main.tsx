import React from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// set up default QueryClient
// You can add various options depending on the needs
// of your application. These options can be
// overridden by each query within the application
// Reference: https://tanstack.com/query/latest/docs/reference/QueryClient
const queryClient = new QueryClient();

// Setup Router Instance
// NOTE: The value `routeTree` will be auto-generated
// when you run `npm run dev`.
const router = createRouter({
  routeTree,
  notFoundMode: "fuzzy",
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

// register the router for type safety
// and code completion
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
