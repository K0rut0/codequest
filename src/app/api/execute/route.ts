import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import { clearTempDirectory, createTemporaryFileName } from "@/lib/fileManager";

const execAsync = promisify(exec);

const compileAndRunCProgram = async (
  sourceCode: string,
  inputFileName: string,
) => {
  const fileName = createTemporaryFileName();
  const filePath = fileName.concat(".c");
  fs.writeFileSync(filePath, sourceCode);

  try {
    const { stderr } = await execAsync(`tcc ${filePath} -o ${fileName}`);
    if (stderr) {
      return new Response(
        JSON.stringify({ error: "Compilation Error", stderr }),
      );
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err, success: false }));
  }

  try {
    const { stdout, stderr } = await execAsync(
      `${fileName} < ${inputFileName}`,
    );
    if (stderr) {
      return new Response(JSON.stringify({ error: "Runtime Error", stderr }));
    }
    return new Response(JSON.stringify({ data: stdout, success: true }));
  } catch (err) {
    return new Response(JSON.stringify({ error: "Runtime Error", err }));
  } finally {
    clearTempDirectory();
  }
};

const runPythonCode = async (sourceCode: string, inputFileName: string) => {
  try {
    const { stdout } = await execAsync(
      `python3.11 -c "${sourceCode}" < ${inputFileName}`,
    );
    return new Response(JSON.stringify({ data: stdout, success: true }));
  } catch (err) {
    console.error("Error executing Python code:", err);
    return new Response(JSON.stringify({ data: err, success: false }));
  } finally {
    clearTempDirectory();
  }
};

export async function POST(req: Request) {
  const body = await req.json();
  const sourceCode = await body.code;
  const inputText = await body.input;
  const language = await body.language;

  const inputFileName = createTemporaryFileName().concat(".in");

  try {
    fs.writeFileSync(inputFileName, inputText);
    if (language == "python") {
      return runPythonCode(sourceCode, inputFileName);
    } else if (language == "c") {
      return compileAndRunCProgram(sourceCode, inputFileName);
    }
  } catch (err) {
    console.error("Error writing to file:", err);
    return new Response(JSON.stringify({ error: err, success: false }));
  }
}
