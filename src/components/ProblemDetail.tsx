import { useMemo, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Problem } from "../types/problem";

interface ProblemDetailProps {
  problem: Problem | null;
  theme: "dark" | "light";
}

export function ProblemDetail({ problem, theme }: ProblemDetailProps) {
  const [copied, setCopied] = useState(false);

  const codeLabel = useMemo(() => {
    if (!problem) {
      return "Python solution";
    }

    return `Python solution for ${problem.title}`;
  }, [problem]);

  const syntaxTheme = useMemo(
    () => (theme === "light" ? oneLight : vscDarkPlus),
    [theme],
  );

  if (!problem) {
    return (
      <section className="detail-panel card empty-state">
        <p>No problem matches the current filters.</p>
      </section>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(problem.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="detail-panel card">
      <div className="detail-hero">
        <div>
          <div className="detail-overline">Interview-ready walkthrough</div>
          <h2>{problem.title}</h2>
        </div>
        <div className="detail-badges">
          <span className="pill subtle">#{problem.number}</span>
          <span
            className={
              problem.difficulty === "Easy" ? "pill easy" : "pill medium"
            }
          >
            {problem.difficulty}
          </span>
          <span className="pill subtle">{problem.pattern}</span>
        </div>
      </div>

      <div className="detail-grid">
        <section>
          <span className="section-kicker">Question</span>
          <p className="detail-copy">{problem.summary}</p>
        </section>

        <section>
          <span className="section-kicker">Why this matters</span>
          <p className="detail-copy">{problem.whyItMatters}</p>
        </section>

        <section>
          <span className="section-kicker">Strategy</span>
          <ol className="detail-list ordered">
            {problem.strategy.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section>
          <span className="section-kicker">Common pitfalls</span>
          <ul className="detail-list">
            {problem.pitfalls.map((pitfall) => (
              <li key={pitfall}>{pitfall}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="complexity-strip">
        <div>
          <span className="section-kicker">Time</span>
          <strong>{problem.complexity.time}</strong>
        </div>
        <div>
          <span className="section-kicker">Space</span>
          <strong>{problem.complexity.space}</strong>
        </div>
        <div>
          <span className="section-kicker">Priority</span>
          <strong>{problem.priority}</strong>
        </div>
      </section>

      <section className="code-section">
        <div className="code-header">
          <div>
            <span className="section-kicker">Python code</span>
            <h3>{codeLabel}</h3>
          </div>
          <button type="button" className="copy-button" onClick={handleCopy}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <div className="code-block" aria-label={codeLabel}>
          <SyntaxHighlighter
            language="python"
            style={syntaxTheme}
            wrapLongLines
            customStyle={{
              margin: 0,
              padding: 0,
              background: "transparent",
              fontSize: "0.92rem",
              lineHeight: 1.65,
              fontFamily:
                '"SFMono-Regular", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
            }}
            codeTagProps={{
              style: {
                fontFamily:
                  '"SFMono-Regular", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
              },
            }}
          >
            {problem.code.trim()}
          </SyntaxHighlighter>
        </div>
      </section>
    </section>
  );
}
