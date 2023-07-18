import React from "react";
import { prisma } from "@/lib/prisma";
import CodeleProblems from "@/components/CodeleProblems";


const Codele = async () => {
    const codeleProblems = await prisma.codele.findMany();

    return(<CodeleProblems problems = {codeleProblems}></CodeleProblems>)
}

export default Codele;