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
          <Link href={`/problems/${problem.slug}`}>
            <div
              key={index}
              className="p-4 dark:bg-night border border-transparent rounded-lg cursor-pointer hover:border-seasalt flex flex-col items-center justify-center h-36"
            >
              <h2 className="text-lg font-semibold mb-2">
                {index + 1}. {problem.title}
              </h2>
              <p className="text-center text-sm text-primary">Easy</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProblemList;
