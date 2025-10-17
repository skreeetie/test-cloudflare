import registerSwaggerRoutes from "./apps/swagger/urls";
import { RouterType } from "./router";
import registerMatchGamesRoutes from "./apps/posts/urls";

export function registerAllRoutes(router: RouterType, apiBase: string) {
  registerSwaggerRoutes(router);
  registerMatchGamesRoutes(router, apiBase);
}
