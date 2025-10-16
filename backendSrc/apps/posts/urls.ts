import { RouterType } from "../../router";
import { DeleteMatchGamesApi } from "./api/deleteMatchGame";
import { GetMatchGamesApi } from "./api/getMatchGames";
import { PatchMatchGamesApi } from "./api/patchMatchGame";
import { PostMatchGamesApi } from "./api/postMatchGames";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export default function registerMatchGamesRoutes(router: RouterType) {
  router.get(`${API_BASE_URL}/api/matchgame`, GetMatchGamesApi);
  router.post(`${API_BASE_URL}/api/matchgame`, PostMatchGamesApi);
  router.delete(`${API_BASE_URL}/api/matchgame/:id`, DeleteMatchGamesApi);
  router.patch(`${API_BASE_URL}/api/matchgame`, PatchMatchGamesApi);
}
