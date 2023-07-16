import React from "react";
import Link from "next/link";
import { Problem } from "@/lib/types";

interface ProblemListProps {
  problems: Problem[];
}

const ProblemList: React.FC<ProblemListProps> = ({ problems }) => {
  return (
    <div className="flex w-2/3 mx-auto">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
        {problems.map((problem, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 flex flex-col items-center justify-center h-48"
          >
            <Link href={`/problems/${problem.slug}`}>
              <h2 className="text-lg font-semibold mb-2">
                {index + 1}. {problem.title}
              </h2>
              <p className="text-center text-sm">Easy</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemList;
