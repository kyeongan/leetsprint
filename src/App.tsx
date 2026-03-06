import { useEffect, useMemo, useState } from "react";
import { Filters } from "./components/Filters";
import { Header } from "./components/Header";
import { ProblemDetail } from "./components/ProblemDetail";
import { ProblemList } from "./components/ProblemList";
import { problems } from "./data/problems";
import type { Difficulty, Priority } from "./types/problem";

type ThemeMode = "dark" | "light";

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = window.localStorage.getItem("only-leetcode-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function App() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");
  const [priority, setPriority] = useState<Priority | "All">("All");
  const [pattern, setPattern] = useState("All");
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [selectedId, setSelectedId] = useState<string | null>(
    problems[0]?.id ?? null,
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("only-leetcode-theme", theme);
  }, [theme]);

  const patterns = useMemo(
    () => ["All", ...new Set(problems.map((problem) => problem.pattern))],
    [],
  );

  const filteredProblems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return problems.filter((problem) => {
      const matchesSearch =
        query.length === 0 ||
        [problem.title, problem.summary, problem.pattern, problem.priority]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesDifficulty =
        difficulty === "All" || problem.difficulty === difficulty;
      const matchesPriority =
        priority === "All" || problem.priority === priority;
      const matchesPattern = pattern === "All" || problem.pattern === pattern;

      return (
        matchesSearch && matchesDifficulty && matchesPriority && matchesPattern
      );
    });
  }, [difficulty, pattern, priority, search]);

  const effectiveSelectedId = filteredProblems.some(
    (problem) => problem.id === selectedId,
  )
    ? selectedId
    : (filteredProblems[0]?.id ?? null);

  const selectedProblem =
    filteredProblems.find((problem) => problem.id === effectiveSelectedId) ??
    null;

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className="page-shell">
      <div className="page-container">
        <Header
          problemCount={problems.length}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <section className="study-plan card">
          <div>
            <span className="section-kicker">Suggested order</span>
            <h2>5-day prep sprint</h2>
          </div>
          <div className="study-plan-grid">
            <article>
              <strong>Day 1</strong>
              <p>Two Sum · Longest Substring</p>
            </article>
            <article>
              <strong>Day 2</strong>
              <p>Level Order Traversal · Number of Islands</p>
            </article>
            <article>
              <strong>Day 3</strong>
              <p>LRU Cache · Rotated Search</p>
            </article>
            <article>
              <strong>Day 4</strong>
              <p>Top K Frequent · Minimum Window</p>
            </article>
            <article>
              <strong>Day 5</strong>
              <p>Word Ladder · Merge K Lists</p>
            </article>
          </div>
        </section>

        <Filters
          search={search}
          difficulty={difficulty}
          priority={priority}
          pattern={pattern}
          patterns={patterns}
          onSearchChange={setSearch}
          onDifficultyChange={setDifficulty}
          onPriorityChange={setPriority}
          onPatternChange={setPattern}
        />

        <main className="app-shell">
          <ProblemList
            problems={filteredProblems}
            selectedId={effectiveSelectedId}
            onSelect={setSelectedId}
          />
          <ProblemDetail problem={selectedProblem} theme={theme} />
        </main>
      </div>
    </div>
  );
}

export default App;
