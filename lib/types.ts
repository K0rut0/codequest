export type Problem = {
  id: number;
  slug: string;
  title: string;
  prompt: string;
  created_at: Date;
};

export type ProblemInput = {
  id: number;
  testcase_id: number;
  problem_id: number;
  input: string;
  output: string;
};
