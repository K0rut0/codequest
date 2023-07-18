import fs from "fs";
import path from "path";

export function clearTempDirectory() {
  fs.rm("temp", { recursive: true }, (err) => {
    if (err) {
      console.error("Error deleting directory:", err);
    }
  });
}

export function createTemporaryFileName() {
  const tempDir = "temp";
  const fileName = `tempfile_${Date.now()}`;

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  return path.join(tempDir, fileName);
}
