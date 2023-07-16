"use client";
import { useState } from "react";

function TestCase({ props }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      <button
        onClick={handleToggle}
        className="w-full px-4 py-2 bg-green-500 text-white flex justify-between"
      >
        <div>Test #{props.testcase_id}:</div>
        <div>Ongoing</div>
      </button>
      <div className={`collapse ${isExpanded ? "show" : "hidden"}`}>
        <div className="p-4 bg-gray-100">
          <div className="self-start">Input</div>
          <textarea
            value={props.input}
            className="w-full bg-white bg-opacity-70 text-black text-lg h-16 resize-none rounded"
            readOnly
          />
          <div className="flex w-full">
            <div className="w-1/2">
              <div className="self-start">Output</div>
              <textarea
                value={props.output}
                className="w-full bg-white bg-opacity-70 text-black text-lg h-16 resize-none rounded"
                readOnly
              />
            </div>
            <div className="w-1/2">
              <div className="self-start">Expected Output</div>
              <textarea
                value={props.output}
                className="w-full bg-white bg-opacity-70 text-black text-lg h-16 resize-none rounded"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestCase;
