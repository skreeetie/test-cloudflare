import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { matchgamesTable } from "../models/MatchGame";
import { drizzle } from "drizzle-orm/d1";
import type { Env } from "../../../";

const RequestSchema = z.object({
  id: z.number(),
  left: z.string(),
  right: z.string(),
});

export class PostMatchGamesApi extends OpenAPIRoute {
  schema = {
    tags: ["matchgames"],
    summary: "Post new match game",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              id: { type: "number" as const },
              left: { type: "string" as const },
              right: { type: "string" as const },
            },
          },
        },
      },
    },
    responses: {
      "201": { description: "Match game was successfully posted" },
      "400": { description: "Bad request" },
      "500": { description: "Internal server error" },
    },
  };

  async handle(request: Request, env: Env) {
    const db = drizzle(env.DB);

    try {
      const body = await request.json();
      const { id, left, right } = RequestSchema.parse(body);

      await db.insert(matchgamesTable).values({
        id,
        left,
        right,
      });

      const result = await env.DB.prepare(
        "SELECT * FROM matchgames_table WHERE id = ?"
      )
        .bind(id)
        .first();

      if (!result) {
        throw new Error("Failed to fetch inserted match game");
      }

      return Response.json(result, { status: 201 });
    } catch (error) {
      console.error(error);

      if (error instanceof z.ZodError) {
        return Response.json(
          { error: "Validation failed", details: error.errors },
          { status: 400 }
        );
      }

      return Response.json(
        { error: "Internal server error", details: String(error) },
        { status: 500 }
      );
    }
  }
}
