import { registerAllRoutes } from "./appReg";
import { router } from "./router";
import type {
  Fetcher,
  D1Database,
  ExecutionContext,
  Request,
} from "@cloudflare/workers-types";

export type Env = {
  DB: D1Database;
  ASSETS: Fetcher;
  VITE_API_BASE_URL?: string;
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const apiBase = env.VITE_API_BASE_URL || '';

    registerAllRoutes(router, apiBase);

    router.all("*", (request: Request, env: Env) => env.ASSETS.fetch(request));

    const response = await router.fetch(request, env, ctx);

    return response;
  },
};
