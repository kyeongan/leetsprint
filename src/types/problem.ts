export type Difficulty = "Easy" | "Medium";
export type Priority = "Must Know" | "High Value";

export interface Problem {
  id: string;
  number: number;
  title: string;
  difficulty: Difficulty;
  priority: Priority;
  pattern: string;
  summary: string;
  whyItMatters: string;
  strategy: string[];
  pitfalls: string[];
  complexity: {
    time: string;
    space: string;
  };
  code: string;
}
