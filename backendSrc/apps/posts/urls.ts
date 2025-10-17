import { RouterType } from "../../router";
import { DeleteMatchGamesApi } from "./api/deleteMatchGame";
import { GetMatchGamesApi } from "./api/getMatchGames";
import { PatchMatchGamesApi } from "./api/patchMatchGame";
import { PostMatchGamesApi } from "./api/postMatchGames";

export default function registerMatchGamesRoutes(router: RouterType, apiBaseUrl: string) {
  router.get(`${apiBaseUrl}/api/matchgame`, GetMatchGamesApi);
  router.post(`${apiBaseUrl}/api/matchgame`, PostMatchGamesApi);
  router.delete(`${apiBaseUrl}/api/matchgame/:id`, DeleteMatchGamesApi);
  router.patch(`${apiBaseUrl}/api/matchgame`, PatchMatchGamesApi);
}
