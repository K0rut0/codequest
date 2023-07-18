import React from "react";
import { CodeleProblem } from "@/lib/types";
import { prisma } from "@/lib/prisma";

interface Props {
    params: {
        id: number;
    };
}

export async function generateStaticParams() {
    const problems = await prisma.codele.findMany();

    return problems.map((problem: CodeleProblem) => ({
        id: `${problem.id}`,
    }));
}

const ProblemLayout = async ({ params }: Props) => {
    let id = +params.id;
    const problem = await prisma.codele.findUnique({
        where: {
            id: id,
        },
    });
    console.log(problem.problem_text.split("@@@"));

return (
    <>
        <div className="flex flex-col w-2/3 mx-auto py-6">
            <h1 className="text-3xl font-bold">{`Day ${problem.id}`}</h1>
            
        </div>
    </>
);
};

export default ProblemLayout;
