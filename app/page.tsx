"use client";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import TestCase from "@/components/TestCase";

const Home: React.FC = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/execute", {
      method: "POST",
      body: JSON.stringify({ code: code, input: input }),
    });
    const data = await res.json();
    setOutput(data.data);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const textarea = event.target as HTMLTextAreaElement;
      const { selectionStart, selectionEnd } = textarea;
      const value = textarea.value;
      textarea.value =
        value.substring(0, selectionStart) +
        "    " +
        value.substring(selectionEnd);
      textarea.selectionStart = textarea.selectionEnd = selectionStart + 4;
    }
  };

  const handleCodeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleOutputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setOutput(e.target.value);
  };

  return (
    <div className="flex flex-col items-center py-4">
      <div className="flex flex-col space-y-4">
        <div className="text-2xl font-bold">Code</div>
        <textarea
          placeholder="Paste your code here"
          value={code}
          onChange={handleCodeChange}
          className="w-lg h-full p-4 border border-gray-300 resize-none"
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex flex-col space-y-4 mt-4">
        <div className="text-2xl font-bold">Input</div>
        <textarea
          placeholder="Input"
          value={input}
          onChange={handleInputChange}
          className="w-lg h-full p-4 border border-gray-300 resize-none"
        />
      </div>
      <div className="flex flex-col space-y-4 mt-4">
        <div className="text-2xl font-bold">Output</div>
        <textarea
          placeholder="Output"
          value={output}
          onChange={handleOutputChange}
          className="w-lg h-full p-4 border border-gray-300 resize-none"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="px-6 py-3 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
};

export default Home;
