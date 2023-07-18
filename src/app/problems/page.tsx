import ProblemList from "@/components/ProblemList";
import { prisma } from "@/lib/prisma";

const Problems = async () => {
  const problems = await prisma.problems.findMany();
  return <ProblemList problems={problems} />;
};

export default Problems;
