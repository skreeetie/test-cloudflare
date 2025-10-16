import { IRequest } from "itty-router";
import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { matchgamesTable } from "../models/MatchGame";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import type { Env } from "../../..";

const PatchGameSchema = z.object({
  id: z.number(),
  left: z.string().optional(),
  right: z.string().optional(),
});

export class PatchMatchGamesApi extends OpenAPIRoute {
  async handle(request: IRequest, env: Env) {
    const db = drizzle(env.DB);

    let data;
    try {
      const body = await request.json();
      data = PatchGameSchema.parse(body);
    } catch {
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { id, ...updateFields } = data;

    if (Object.keys(updateFields).length === 0) {
      return Response.json({ error: "No fields to update" }, { status: 400 });
    }

    try {
      const result = await db
        .update(matchgamesTable)
        .set(updateFields)
        .where(eq(matchgamesTable.id, id))
        .run();

      if (result.rowsAffected === 0) {
        return Response.json(
          { error: "Match game not found" },
          { status: 404 }
        );
      }

      return Response.json(
        { success: true, updated: result.rowsAffected },
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
