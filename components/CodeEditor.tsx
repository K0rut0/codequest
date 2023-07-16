"use client";
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageDropdown from "./LanguageDropdown";

const languages = {
  python: {
    fileName: "main.py",
    language: "python",
    defaultValue: `# Write Python 3 code in this online editor and run it.\nprint("Hello world")`,
  },
  cpp: {
    fileName: "main.cpp",
    language: "cpp",
    defaultValue: `// Write C++ code in this online editor and run it.
#include <iostream>

int main() {
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

  return (
    <div className="flex flex-col w-full h-128 my-4">
      <div className="flex flex-row w-full justify-between">
        <h1 className="text-3xl">Code Editor</h1>
        <LanguageDropdown
          options={["python", "cpp", "java"]}
          selectedValue={language}
          onSelectionChange={handleOnSelectionChange}
        />
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
  );
};

export default CodeEditor;
