import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Header } from "../Header";

vi.mock("../GitHubActions", () => ({
  GitHubActions: () => <div data-testid="github-actions" />,
}));

describe("Header", () => {
  it("renders the problem count", () => {
    render(
      <Header problemCount={10} theme="dark" onToggleTheme={vi.fn()} />,
    );

    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("shows 'Light theme' button when in dark mode", () => {
    render(
      <Header problemCount={10} theme="dark" onToggleTheme={vi.fn()} />,
    );

    expect(
      screen.getByRole("button", { name: /switch to light theme/i }),
    ).toBeInTheDocument();
  });

  it("shows 'Dark theme' button when in light mode", () => {
    render(
      <Header problemCount={10} theme="light" onToggleTheme={vi.fn()} />,
    );

    expect(
      screen.getByRole("button", { name: /switch to dark theme/i }),
    ).toBeInTheDocument();
  });

  it("calls onToggleTheme when the theme button is clicked", async () => {
    const onToggleTheme = vi.fn();
    render(
      <Header problemCount={10} theme="dark" onToggleTheme={onToggleTheme} />,
    );

    await userEvent.click(
      screen.getByRole("button", { name: /switch to light theme/i }),
    );

    expect(onToggleTheme).toHaveBeenCalledOnce();
  });

  it("renders the LeetSprint title", () => {
    render(
      <Header problemCount={10} theme="dark" onToggleTheme={vi.fn()} />,
    );

    expect(screen.getByRole("heading", { name: "LeetSprint" })).toBeInTheDocument();
  });
});
