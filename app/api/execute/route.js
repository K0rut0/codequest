import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";

const execAsync = promisify(exec);

const compileAndRunCProgram = async (sourceCode) => {
  const fileName = "temp.c";

  try {
    fs.writeFileSync(fileName, sourceCode);
    const { err, stderr } = await execAsync(`tcc ${fileName} -o temp`);
    if (err) {
      return new Response(
        JSON.stringify({ error: "Compilation Error", stderr }),
      );
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err, success: false }));
  }

  try {
    const { err, stdout, stderr } = await execAsync(
      `./temp < ./public/input.txt`,
    );
    if (err) {
      return new Response(JSON.stringify({ error: "Runtime Error", stderr }));
    }
    return new Response(JSON.stringify({ data: stdout, success: true }));
  } catch (err) {
    return new Response(JSON.stringify({ error: "Runtime Error", err }));
  }
};

const runPythonCode = async (sourceCode) => {
  try {
    const { stdout } = await execAsync(
      `python3.11 -c "${sourceCode}" < ./public/input.txt`,
    );
    return new Response(JSON.stringify({ data: stdout, success: true }));
  } catch (err) {
    console.error("Error executing Python code:", err);
    return new Response(JSON.stringify({ data: stderr, success: false }));
  }
};

export async function POST(req) {
  const body = await req.json();
  const sourceCode = await body.code;
  const inputText = await body.input;
  const language = await body.language;

  fs.writeFile("./public/input.txt", inputText, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return new Response(JSON.stringify({ data: err, success: false }));
    }
  });

  if (language == "python") {
    return runPythonCode(sourceCode);
  } else if (language == "c") {
    return compileAndRunCProgram(sourceCode);
  }
}
