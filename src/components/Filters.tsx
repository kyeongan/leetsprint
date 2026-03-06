import type { Difficulty, Priority } from "../types/problem";

interface FiltersProps {
  search: string;
  difficulty: Difficulty | "All";
  priority: Priority | "All";
  pattern: string;
  patterns: string[];
  onSearchChange: (value: string) => void;
  onDifficultyChange: (value: Difficulty | "All") => void;
  onPriorityChange: (value: Priority | "All") => void;
  onPatternChange: (value: string) => void;
}

export function Filters({
  search,
  difficulty,
  priority,
  pattern,
  patterns,
  onSearchChange,
  onDifficultyChange,
  onPriorityChange,
  onPatternChange,
}: FiltersProps) {
  return (
    <section className="filters card" aria-label="Problem filters">
      <div className="search-field">
        <label htmlFor="problem-search">Search</label>
        <input
          id="problem-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search title, pattern, or topic"
        />
      </div>

      <div className="filter-groups">
        <div>
          <span className="filter-label">Difficulty</span>
          <div className="chip-row">
            {(["All", "Easy", "Medium"] as const).map((value) => (
              <button
                key={value}
                type="button"
                className={value === difficulty ? "chip active" : "chip"}
                onClick={() => onDifficultyChange(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="filter-label">Priority</span>
          <div className="chip-row">
            {(["All", "Must Know", "High Value"] as const).map((value) => (
              <button
                key={value}
                type="button"
                className={value === priority ? "chip active" : "chip"}
                onClick={() => onPriorityChange(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="filter-label">Pattern</span>
          <div className="chip-row">
            {patterns.map((value) => (
              <button
                key={value}
                type="button"
                className={value === pattern ? "chip active" : "chip"}
                onClick={() => onPatternChange(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
