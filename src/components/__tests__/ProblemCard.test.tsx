import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProblemCard } from "../ProblemCard";
import { mockMediumProblem, mockProblem } from "../../test/fixtures";

describe("ProblemCard", () => {
  it("renders problem number, title, summary, priority, and pattern", () => {
    render(
      <ProblemCard problem={mockProblem} active={false} onSelect={vi.fn()} />,
    );

    expect(screen.getByText("#1")).toBeInTheDocument();
    expect(screen.getByText("Two Sum")).toBeInTheDocument();
    expect(
      screen.getByText("Find two numbers in an array that add up to a target."),
    ).toBeInTheDocument();
    expect(screen.getByText("Must Know")).toBeInTheDocument();
    expect(screen.getByText("Hash Map")).toBeInTheDocument();
  });

  it("applies the 'easy' pill class for Easy difficulty", () => {
    render(
      <ProblemCard problem={mockProblem} active={false} onSelect={vi.fn()} />,
    );

    expect(screen.getByText("Easy")).toHaveClass("pill", "easy");
  });

  it("applies the 'medium' pill class for Medium difficulty", () => {
    render(
      <ProblemCard
        problem={mockMediumProblem}
        active={false}
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByText("Medium")).toHaveClass("pill", "medium");
  });

  it("adds 'active' class when active prop is true", () => {
    const { container } = render(
      <ProblemCard problem={mockProblem} active={true} onSelect={vi.fn()} />,
    );

    expect(container.firstChild).toHaveClass("problem-card", "active");
  });

  it("does not add 'active' class when active prop is false", () => {
    const { container } = render(
      <ProblemCard problem={mockProblem} active={false} onSelect={vi.fn()} />,
    );

    expect(container.firstChild).toHaveClass("problem-card");
    expect(container.firstChild).not.toHaveClass("active");
  });

  it("calls onSelect with the problem id when clicked", async () => {
    const onSelect = vi.fn();
    render(
      <ProblemCard problem={mockProblem} active={false} onSelect={onSelect} />,
    );

    await userEvent.click(screen.getByRole("button"));

    expect(onSelect).toHaveBeenCalledOnce();
    expect(onSelect).toHaveBeenCalledWith("two-sum");
  });
});
