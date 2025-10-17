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

function handleCors(request: Request) {
  const headers = {
    "Access-Control-Allow-Origin": "https://test-cloudflare-pi.vercel.app",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  return headers;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const apiBase = env.VITE_API_BASE_URL || "";

    if (request.method === "OPTIONS") {
      return handleCors(request);
    }
    
    registerAllRoutes(router, apiBase);
    
    router.all("*", (request: Request, env: Env) => env.ASSETS.fetch(request));

    const response = await router.fetch(request, env, ctx);

    const corsHeaders = handleCors(request);
    const finalResponse = new Response(response.body, response);
    Object.entries(corsHeaders).forEach(([key, value]) => {
      finalResponse.headers.set(key, value);
    });

    return finalResponse;
  },
};
