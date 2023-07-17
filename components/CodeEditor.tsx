"use client";
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageDropdown from "./LanguageDropdown";

const languages = {
  python: {
    fileName: "main.py",
    language: "python",
    defaultValue: `# Write Python 3 code in this online editor and run it.\nprint("Hello world")`,
  },
  c: {
    fileName: "temp.c",
    language: "c",
    defaultValue: `// Write C code in this editor and run it.\n#include <stdio.h>\n\nint main() {\n\t// Write C code here\n\treturn 0;\n}`,
  },
  cpp: {
    fileName: "main.cpp",
    language: "cpp",
    defaultValue: `// Write C++ code in this online editor and run it.\n#include <iostream>\n\nint main() {
    // Write C++ code here
    std::cout << "Hello world!";

    return 0;
}`,
  },

  java: {
    filename: "Main.java",
    language: "java",
    defaultValue: `// Use this editor to write, compile and run your Java code online

class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },
};

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const handleOnSelectionChange = (value: string) => {
    setCode(languages[value].defaultValue);
    setLanguage(value);
  };
  const [output, setOutput] = useState("");

  useEffect(() => {
    console.log(output);
  }, [output]);

  const input = "2";

  const handleSubmit = async () => {
    const res = await fetch("/api/execute", {
      method: "POST",
      body: JSON.stringify({ code: code, language: language, input: input }),
    });
    const data = await res.json();
    setOutput(data.data);
  };

  return (
    <>
      <div className="flex flex-col w-full h-128 my-5">
        <div className="flex flex-row w-full justify-between">
          <h1 className="text-3xl">Code Editor</h1>
          <div>
            <LanguageDropdown
              options={["python", "cpp", "java", "c"]}
              selectedValue={language}
              onSelectionChange={handleOnSelectionChange}
            />
            <button
              onClick={handleSubmit}
              className="ml-1 py-1 px-3 bg-darkGreen rounded shadow-md border border-transparent hover:border-seasalt transition duration-300 ease-in-out"
            >
              run
            </button>
          </div>
        </div>
        <div className="rounded-md overflow-hidden w-full h-full">
          <Editor
            className="w-full h-full"
            theme="vs-dark"
            value={code}
            onChange={setCode}
            defaultLanguage={language}
            defaultPath={languages[language].fileName}
            defaultValue={languages[language].defaultValue}
            options={{
              minimap: { enabled: false },
              fontSize: 16,
              padding: {
                top: 28,
                bottom: 28,
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
