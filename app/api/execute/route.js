import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";

const execAsync = promisify(exec);

export async function POST(req) {
  const body = await req.json();
  const pythonCode = await body.code;
  const inputText = await body.input;

  fs.writeFile("./public/input.txt", inputText, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return new Response(JSON.stringify({ data: err, success: false }));
    }
  });

  try {
    const { stdout } = await execAsync(
      `python3.11 -c "${pythonCode}" < ./public/input.txt`,
    );
    return new Response(JSON.stringify({ data: stdout, success: true }));
  } catch (err) {
    console.error("Error executing Python code:", err);
    return new Response(JSON.stringify({ data: stderr, success: false }));
  }
}
