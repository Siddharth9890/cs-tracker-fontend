import fs from "fs";
import path from "path";

export async function fetchFile() {
  // Path to the JSON file
  const filePath = path.join(process.cwd(), "/a2z.json");

  // Read the JSON file
  const fileContents = fs.readFileSync(filePath, "utf8");

  // Parse JSON content
  const data = JSON.parse(fileContents);

  // Return the data as props
  return data;
}
