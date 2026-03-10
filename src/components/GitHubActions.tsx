import { useEffect, useState } from "react";

const REPO = "kyeongan/leetsprint";
const REPO_URL = "https://github.com/kyeongan/leetsprint";

export function GitHubActions() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {
        // silently degrade — button still works without the count
      });
  }, []);

  return (
    <div className="github-actions">
      <a
        href={REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="gh-btn gh-btn--star"
        aria-label="Star this project on GitHub"
      >
        <span className="gh-btn-icon" aria-hidden="true">⭐</span>
        Star
        {stars !== null && (
          <span className="gh-btn-count">{stars.toLocaleString()}</span>
        )}
      </a>
      <a
        href={`${REPO_URL}/issues`}
        target="_blank"
        rel="noopener noreferrer"
        className="gh-btn gh-btn--contribute"
        aria-label="Contribute to this project on GitHub"
      >
        <span className="gh-btn-icon" aria-hidden="true">🤝</span>
        Contribute
      </a>
    </div>
  );
}
