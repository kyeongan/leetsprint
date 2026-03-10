# Contributing to LeetSprint

Thanks for your interest in improving LeetSprint! 🎉  
Contributions of all kinds are welcome — new problems, fixes, UI improvements, and ideas.

---

## Ways to Contribute

### ⭐ Star the repo
The simplest way to show support — it helps others discover the project.

### 🐛 Report an issue
Found a bug, a broken layout, or incorrect problem content?  
[Open an issue](https://github.com/kyeongan/leetsprint/issues) with a clear description and steps to reproduce.

### 💡 Suggest a problem
Think a LeetCode problem deserves a spot in the sprint?  
[Open an issue](https://github.com/kyeongan/leetsprint/issues) with the problem title, number, and why it's high-value for interviews.

### 🛠 Submit a pull request

1. **Fork** the repository and create a branch:
   ```bash
   git checkout -b feat/add-problem-42
   ```

2. **Install dependencies** and run the dev server:
   ```bash
   npm install
   npm run dev
   ```

3. **Add or edit a problem** in `src/data/problems.ts`.  
   Each problem follows the `Problem` interface defined in `src/types/problem.ts`:
   ```ts
   {
     id: string;           // unique slug, e.g. "valid-parentheses"
     number: number;       // LeetCode problem number
     title: string;
     difficulty: "Easy" | "Medium" | "Hard";
     priority: "Must-Do" | "High" | "Medium";
     pattern: string;      // e.g. "Stack", "Sliding Window"
     summary: string;      // one-sentence paraphrased description (no verbatim copy)
     whyItMatters: string;
     strategy: string[];   // step-by-step interview strategy bullets
     pitfalls: string[];   // common mistakes to avoid
     complexity: { time: string; space: string };
     code: string;         // clean Python solution
   }
   ```

4. **Run the build** to confirm there are no errors:
   ```bash
   npm run build
   ```

5. **Open a pull request** against the `main` branch with a clear description of your change.

---

## Guidelines

- Keep problem summaries **paraphrased** — do not copy LeetCode problem statements verbatim.
- Python solutions should be clean, readable, and interview-ready (no hacky tricks).
- Keep the sprint focused: prioritize **high-signal, pattern-representative** problems.
- Match the existing code style (TypeScript, no external UI libraries).

---

## Questions?

[Open an issue](https://github.com/kyeongan/leetsprint/issues) — happy to help!
