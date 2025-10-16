import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { matchgamesSchema, matchgamesTable } from "../models/MatchGame";
import { drizzle } from "drizzle-orm/d1";
import type { TMatchGamesResponse } from "../../../types";
import type { Env } from "../../../";

const RESPONSE_SCHEMA = z.array(
  matchgamesSchema
) satisfies z.ZodType<TMatchGamesResponse>;

export class GetMatchGamesApi extends OpenAPIRoute {
  schema = {
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: RESPONSE_SCHEMA,
          },
        },
      },
    },
  };

  async handle(_request: Request, env: Env) {
    const db = drizzle(env.DB);
    const matchGames = await db.select().from(matchgamesTable);
    const responseSchema = z.array(
      z.object({
        id: z.number(),
        left: z.string(),
        right: z.string(),
      })
    );
    return Response.json(responseSchema.parse(matchGames));
  }
}
