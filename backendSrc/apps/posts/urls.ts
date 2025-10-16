import { RouterType } from "../../router";
import { DeleteMatchGamesApi } from "./api/deleteMatchGame";
import { GetMatchGamesApi } from "./api/getMatchGames";
import { PatchMatchGamesApi } from "./api/patchMatchGame";
import { PostMatchGamesApi } from "./api/postMatchGames";

export default function registerMatchGamesRoutes(router: RouterType) {
  router.get("/api/matchgame/", GetMatchGamesApi);
  router.post("/api/matchgame/", PostMatchGamesApi);
  router.delete("/api/matchgame/:id", DeleteMatchGamesApi);
  router.patch("/api/matchgame/", PatchMatchGamesApi);
}
