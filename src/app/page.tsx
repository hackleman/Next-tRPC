import { db } from "~/server/db";
import { files as filesSchema, folders as foldersSchema } from "~/server/db/schema";
import DriveContent from "./drive-ui";

export default async function GoogleDriveClone() {
  const files = await db.select().from(filesSchema);
  const folders = await db.select().from(foldersSchema);

  return (
    <DriveContent files={files} folders={folders} />
  )
}