interface HeaderProps {
  problemCount: number;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export function Header({ problemCount, theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="hero card">
      <div className="hero-header">
        <div className="eyebrow">
          Public interview sprint for software engineers
        </div>
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
          }
        >
          <span className="theme-toggle-icon" aria-hidden="true">
            {theme === "dark" ? "☀" : "☾"}
          </span>
          {theme === "dark" ? "Light theme" : "Dark theme"}
        </button>
      </div>
      <h1>LeetSprint</h1>
      <p className="hero-copy">
        Sharpen high-impact coding patterns in one focused sprint. Practice 10
        must-know problems with concise strategy, clean Python solutions, and a
        fast study flow built for real interview prep.
      </p>
      <div className="hero-stats">
        <div>
          <span className="stat-label">Problems</span>
          <strong>{problemCount}</strong>
        </div>
        <div>
          <span className="stat-label">Primary focus</span>
          <strong>Medium + patterns</strong>
        </div>
        <div>
          <span className="stat-label">Format</span>
          <strong>Question · Strategy · Python</strong>
        </div>
      </div>
    </header>
  );
}
