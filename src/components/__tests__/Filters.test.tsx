import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Filters } from "../Filters";

const defaultProps = {
  search: "",
  difficulty: "All" as const,
  priority: "All" as const,
  pattern: "All",
  patterns: ["All", "Hash Map", "Sliding Window", "BFS"],
  onSearchChange: vi.fn(),
  onDifficultyChange: vi.fn(),
  onPriorityChange: vi.fn(),
  onPatternChange: vi.fn(),
};

describe("Filters", () => {
  it("renders the search input", () => {
    render(<Filters {...defaultProps} />);

    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("calls onSearchChange when typing in the search box", async () => {
    const onSearchChange = vi.fn();
    render(<Filters {...defaultProps} onSearchChange={onSearchChange} />);

    await userEvent.type(screen.getByRole("searchbox"), "two");

    expect(onSearchChange).toHaveBeenCalledTimes(3);
  });

  it("renders all difficulty chip options", () => {
    render(<Filters {...defaultProps} />);

    // There are three "All" chips (Difficulty, Priority, Pattern); verify all exist
    expect(screen.getAllByRole("button", { name: "All" })).toHaveLength(3);
    expect(screen.getByRole("button", { name: "Easy" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Medium" })).toBeInTheDocument();
  });

  it("marks the active difficulty chip", () => {
    render(<Filters {...defaultProps} difficulty="Easy" />);

    expect(screen.getByRole("button", { name: "Easy" })).toHaveClass(
      "chip",
      "active",
    );
    expect(screen.getByRole("button", { name: "Medium" })).not.toHaveClass(
      "active",
    );
  });

  it("calls onDifficultyChange with 'Easy' when Easy chip is clicked", async () => {
    const onDifficultyChange = vi.fn();
    render(<Filters {...defaultProps} onDifficultyChange={onDifficultyChange} />);

    await userEvent.click(screen.getByRole("button", { name: "Easy" }));

    expect(onDifficultyChange).toHaveBeenCalledWith("Easy");
  });

  it("calls onPriorityChange when a priority chip is clicked", async () => {
    const onPriorityChange = vi.fn();
    render(<Filters {...defaultProps} onPriorityChange={onPriorityChange} />);

    await userEvent.click(screen.getByRole("button", { name: "Must Know" }));

    expect(onPriorityChange).toHaveBeenCalledWith("Must Know");
  });

  it("renders pattern chips from the patterns prop", () => {
    render(<Filters {...defaultProps} />);

    expect(screen.getByRole("button", { name: "Hash Map" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Sliding Window" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "BFS" })).toBeInTheDocument();
  });

  it("calls onPatternChange when a pattern chip is clicked", async () => {
    const onPatternChange = vi.fn();
    render(<Filters {...defaultProps} onPatternChange={onPatternChange} />);

    await userEvent.click(screen.getByRole("button", { name: "Hash Map" }));

    expect(onPatternChange).toHaveBeenCalledWith("Hash Map");
  });

  it("marks the active pattern chip", () => {
    render(<Filters {...defaultProps} pattern="Sliding Window" />);

    expect(
      screen.getByRole("button", { name: "Sliding Window" }),
    ).toHaveClass("chip", "active");
  });
});
