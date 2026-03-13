import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { problems } from "./data/problems";

vi.mock("./components/GitHubActions", () => ({
  GitHubActions: () => <div data-testid="github-actions" />,
}));

vi.mock("react-syntax-highlighter", () => ({
  Prism: ({ children }: { children: string }) => <pre>{children}</pre>,
}));

vi.mock("react-syntax-highlighter/dist/esm/styles/prism", () => ({
  oneLight: {},
  vscDarkPlus: {},
}));

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (_index: number) => null,
  } satisfies Storage;
})();

beforeAll(() => {
  vi.stubGlobal("localStorage", localStorageMock);
});

describe("App – filtering", () => {
  beforeEach(() => {
    window.localStorage.removeItem("only-leetcode-theme");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows all problems on initial render", () => {
    render(<App />);

    expect(document.querySelectorAll(".problem-card")).toHaveLength(
      problems.length,
    );
  });

  it(`filters to only Easy problems when the Easy chip is clicked`, async () => {
    render(<App />);

    const filtersSection = screen.getByRole("region", {
      name: /problem filters/i,
    });
    const difficultyChips = within(filtersSection).getAllByRole("button");
    const easyChip = difficultyChips.find((btn) => btn.textContent === "Easy");
    await userEvent.click(easyChip!);

    const countText = screen.getByText(/\d+ shown/);
    const count = parseInt(countText.textContent ?? "0");
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(10);
  });

  it("filters by search term (case-insensitive)", async () => {
    render(<App />);

    await userEvent.type(screen.getByRole("searchbox"), "lru");

    expect(screen.getByText(/1 shown/)).toBeInTheDocument();
    // "LRU Cache" appears in both list card (h3) and detail panel (h2)
    expect(screen.getAllByText("LRU Cache").length).toBeGreaterThan(0);
  });

  it("shows '0 shown' and empty-state message when no problems match", async () => {
    render(<App />);

    await userEvent.type(
      screen.getByRole("searchbox"),
      "xyznotamatchatall123",
    );

    expect(screen.getByText(/0 shown/)).toBeInTheDocument();
    expect(
      screen.getByText("No problem matches the current filters."),
    ).toBeInTheDocument();
  });

  it("auto-selects the first filtered result when the current selection is filtered out", async () => {
    render(<App />);

    // Two Sum is Easy — selecting it then filtering to Medium should switch selection
    await userEvent.type(screen.getByRole("searchbox"), "two sum");

    // "Two Sum" should be visible and selected
    expect(screen.getByText(/1 shown/)).toBeInTheDocument();

    // Now clear and filter Medium only — Two Sum (Easy) should no longer be selected
    await userEvent.clear(screen.getByRole("searchbox"));

    const filtersSection = screen.getByRole("region", {
      name: /problem filters/i,
    });
    const mediumChip = within(filtersSection).getByRole("button", {
      name: "Medium",
    });
    await userEvent.click(mediumChip);

    // Detail panel should not show Two Sum
    const detailPanel = document.querySelector(".detail-panel");
    expect(detailPanel).not.toHaveTextContent("Two Sum");
  });

  it("resets to all problems after clearing the search", async () => {
    render(<App />);

    await userEvent.type(screen.getByRole("searchbox"), "lru");
    expect(screen.getByText(/1 shown/)).toBeInTheDocument();

    await userEvent.clear(screen.getByRole("searchbox"));
    expect(document.querySelectorAll(".problem-card")).toHaveLength(
      problems.length,
    );
  });

  it("persists the theme to localStorage when toggled", async () => {
    render(<App />);

    const themeBtn = screen.getByRole("button", { name: /switch to light theme/i });
    await userEvent.click(themeBtn);

    expect(window.localStorage.getItem("only-leetcode-theme")).toBe("light");
  });

  it("reads the saved theme from localStorage on mount", () => {
    window.localStorage.setItem("only-leetcode-theme", "light");
    render(<App />);

    expect(document.documentElement.dataset.theme).toBe("light");
  });
});
