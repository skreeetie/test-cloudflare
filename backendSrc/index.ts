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

const getCorsHeaders = (request: Request) => ({
  "Access-Control-Allow-Origin": "https://test-cloudflare-pi.vercel.app",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
});

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const apiBase = env.VITE_API_BASE_URL || "";

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: getCorsHeaders(request) });
    }
    
    registerAllRoutes(router, apiBase);
    
    router.all("*", (request: Request, env: Env) => env.ASSETS.fetch(request));

    const response = await router.fetch(request, env, ctx);

    const finalResponse = new Response(response.body, response);
    Object.entries(getCorsHeaders(request)).forEach(([key, value]) => {
      finalResponse.headers.set(key, value);
    });

    return finalResponse;
  },
};
