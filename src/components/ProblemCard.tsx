import type { Problem } from "../types/problem";

interface ProblemCardProps {
  problem: Problem;
  active: boolean;
  onSelect: (id: string) => void;
}

export function ProblemCard({ problem, active, onSelect }: ProblemCardProps) {
  return (
    <button
      type="button"
      className={active ? "problem-card active" : "problem-card"}
      onClick={() => onSelect(problem.id)}
    >
      <div className="problem-card-top">
        <span className="problem-number">#{problem.number}</span>
        <span
          className={
            problem.difficulty === "Easy" ? "pill easy" : "pill medium"
          }
        >
          {problem.difficulty}
        </span>
      </div>
      <h3>{problem.title}</h3>
      <p>{problem.summary}</p>
      <div className="problem-meta">
        <span className="pill subtle">{problem.priority}</span>
        <span className="pill subtle">{problem.pattern}</span>
      </div>
    </button>
  );
}
