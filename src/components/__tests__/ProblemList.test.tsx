import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProblemList } from "../ProblemList";
import { mockMediumProblem, mockProblem } from "../../test/fixtures";

describe("ProblemList", () => {
  it("renders a card for each problem", () => {
    render(
      <ProblemList
        problems={[mockProblem, mockMediumProblem]}
        selectedId={null}
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByText("Two Sum")).toBeInTheDocument();
    expect(
      screen.getByText("Longest Substring Without Repeating Characters"),
    ).toBeInTheDocument();
  });

  it("shows the correct problem count", () => {
    render(
      <ProblemList
        problems={[mockProblem, mockMediumProblem]}
        selectedId={null}
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByText("2 shown")).toBeInTheDocument();
  });

  it("shows '0 shown' when the list is empty", () => {
    render(
      <ProblemList problems={[]} selectedId={null} onSelect={vi.fn()} />,
    );

    expect(screen.getByText("0 shown")).toBeInTheDocument();
  });

  it("passes the active prop correctly to the selected card", () => {
    const { container } = render(
      <ProblemList
        problems={[mockProblem, mockMediumProblem]}
        selectedId="two-sum"
        onSelect={vi.fn()}
      />,
    );

    const cards = container.querySelectorAll(".problem-card");
    expect(cards[0]).toHaveClass("active");
    expect(cards[1]).not.toHaveClass("active");
  });

  it("calls onSelect with the correct id when a card is clicked", async () => {
    const onSelect = vi.fn();
    render(
      <ProblemList
        problems={[mockProblem, mockMediumProblem]}
        selectedId={null}
        onSelect={onSelect}
      />,
    );

    await userEvent.click(screen.getByText("Two Sum"));

    expect(onSelect).toHaveBeenCalledWith("two-sum");
  });
});
