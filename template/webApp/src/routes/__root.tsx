import React, { Suspense } from "react";
import { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  Link,
} from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const TanstackRouterDevtools = import.meta.env.DEV
  ? React.lazy(() =>
    // lazy load in dev
    import("@tanstack/router-devtools").then((res) => ({
      default: res.TanStackRouterDevtools,
    })),
  )
  : () => null;

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  // notFoundComponent: NotFoundComponent,
  // errorComponent: ErrorComponent
});

/** The following components can be
    abstracted to reusable components
    that can be imported where necessary.
    To test them out simply uncomment the
    `notFoundComponent` and the `errorComponent`
    in the Route declaration above, and uncomment the
    function definitions below
    Check the docs at: https://tanstack.com/router/latest/docs/framework/react/overview
*/
// function NotFoundComponent () {
//   return (
//     <div>Your custom not found component</div>
//   )
// }

// function ErrorComponent () {
//   return (
//     <div>Your custom error component</div>
//   )
// }

function RootComponent() {
  return (
    <main>
      {/* an example of a top nav with a link item. Ideally this should be a reusable component */}
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Outlet />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />

      <Suspense>
        <TanstackRouterDevtools position="bottom-right" />
      </Suspense>
    </main>
  );
}
