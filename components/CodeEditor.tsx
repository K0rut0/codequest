"use client";
import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const [code, setCode] = useState("");

  return (
    <div className="flex flex-col w-full h-128 my-4">
      <h1 className="text-3xl">Code Editor</h1>
      <div className="rounded-md overflow-hidden w-full h-full">
        <Editor
          className="w-full h-full rounded-md"
          theme="vs-dark"
          defaultLanguage="python"
          value={code}
          onChange={setCode}
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            padding: {
              top: 24,
              bottom: 24,
              // @ts-ignore
              left: 10,
              right: 10,
            },
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
