import React from "react";
import { Problem } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import PromptMDX from "@/components/PromptMDX";
import CodeEditor from "@/components/CodeEditor";
import SyntaxHighlightedTextarea from "@/components/SyntaxHighlightedTextarea";
import TestCase from "@/components/TestCase";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const problems = await prisma.problems.findMany();

  return problems.map((problem: Problem) => ({
    slug: problem.slug,
  }));
}

const ProblemLayout = async ({ params }: Props) => {
  const slug = params.slug;
  const problem = await prisma.problems.findUnique({
    where: {
      slug: slug,
    },
  });

  return (
    <>
      <div className="flex flex-col w-2/3 mx-auto py-6">
        <h1 className="text-3xl font-bold">{problem.title}</h1>
        <PromptMDX props={{ markdown: problem.prompt }} />
        <CodeEditor />
      </div>
    </>
  );
};

export default ProblemLayout;
