import { matchRoutes } from "react-router";
import { describe, expect, it } from "vitest";

import { routes } from "@/routes";

// Match routes without rendering: every public URL must resolve to a real page, not the 404 catch-all.
describe("App routing", () => {
  it.each(["/", "/auth", "/signup", "/app"])("matches a page for %s instead of falling back to not found", (path) => {
    const matches = matchRoutes(routes, path);
    expect(matches?.at(-1)?.route.path).toBe(path);
  });

  it("falls back to not found for unknown paths", () => {
    expect(matchRoutes(routes, "/nope")?.at(-1)?.route.path).toBe("*");
  });
});
