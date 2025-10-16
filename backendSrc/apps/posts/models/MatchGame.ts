import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import type { TMatchGame } from "../../../types";

export const matchgamesTable = sqliteTable("matchgames_table", {
  id: int().primaryKey({ autoIncrement: true }),
  left: text().notNull(),
  right: text().notNull(),
});

export const matchgamesSchema = z.object({
  id: z.number(),
  left: z.string(),
  right: z.string(),
}) satisfies z.ZodType<TMatchGame>;
