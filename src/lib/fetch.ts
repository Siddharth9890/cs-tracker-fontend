import { Topic } from "@/types";
import fs from "fs";
import path from "path";

export async function fetchFile() {
  const filePath = path.join(process.cwd(), "/neetcode150.json");

  const fileContents = fs.readFileSync(filePath, "utf8");

  const topics: Topic[] = JSON.parse(fileContents);

  return topics;
}
