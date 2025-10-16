import { IRequest } from "itty-router";
import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { matchgamesTable } from "../models/MatchGame";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import type { Env } from "../../..";

const DeleteGameSchema = z.object({
  id: z.string().regex(/^\d+$/, "id is number"),
});

export class DeleteMatchGamesApi extends OpenAPIRoute {
  async handle(request: IRequest, env: Env) {
    const db = drizzle(env.DB);
    const params = DeleteGameSchema.safeParse(request.params);

    if (!params.success) {
      return Response.json({ error: params.error.message }, { status: 400 });
    }

    const matchGameId = Number(params.data.id);

    try {
      const result = await db
        .delete(matchgamesTable)
        .where(eq(matchgamesTable.id, matchGameId))
        .run();

      if (result.rowsAffected === 0) {
        return Response.json(
          { error: "Match game not found" },
          { status: 404 }
        );
      }

      return Response.json(
        { success: true, deleted: result.rowsAffected },
        { status: 200 }
      );
    } catch (error) {
      return Response.json(
        { error: (error as Error).message },
        { status: 500 }
      );
    }
  }
}
