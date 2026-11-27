import type { RouteObject } from "react-router";

import { RootLayout } from "./components/RootLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ErrorPage, NotFoundPage } from "./pages/ErrorPages";
import { HomePage } from "./pages/HomePage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { DashboardPage } from "./pages/DashboardPage";

// Client-side routes. Paths match the previous TanStack routes so existing links keep working.
export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/auth", element: <SignInPage /> },
      { path: "/signup", element: <SignUpPage /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: "/app", element: <DashboardPage /> }],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];
