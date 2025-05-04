import "server-only";

import { int, bigint, text, index, singlestoreTableCreator } from "drizzle-orm/singlestore-core";

export const tableCreator = singlestoreTableCreator(
  (name) => `drive_tutorial_${name}`
);

export const files = tableCreator("files_table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  name: text("name"),
  size: int("size"),
  url: text("url"),
  parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
}, (t) => {
  return [
    index("parent_index").on(t.parent),
  ]
});

export const folders = tableCreator("folders_table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }),
}, (t) => {
  return [
    index("parent_index").on(t.parent),
  ]
});