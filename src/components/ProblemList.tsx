import type { Problem } from "../types/problem";
import { ProblemCard } from "./ProblemCard";

interface ProblemListProps {
  problems: Problem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ProblemList({
  problems,
  selectedId,
  onSelect,
}: ProblemListProps) {
  return (
    <aside className="list-panel card">
      <div className="panel-header">
        <div>
          <span className="section-kicker">Curated set</span>
          <h2>Top 10 practice list</h2>
        </div>
        <span className="results-count">{problems.length} shown</span>
      </div>

      <div className="problem-list">
        {problems.map((problem) => (
          <ProblemCard
            key={problem.id}
            problem={problem}
            active={problem.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </aside>
  );
}
