import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GitHubActions } from "../GitHubActions";

describe("GitHubActions", () => {
  beforeEach(() => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      json: () => Promise.resolve({ stargazers_count: 42 }),
    } as Response);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the Star link", () => {
    render(<GitHubActions />);

    expect(
      screen.getByRole("link", { name: /star this project/i }),
    ).toBeInTheDocument();
  });

  it("renders the Contribute link", () => {
    render(<GitHubActions />);

    expect(
      screen.getByRole("link", { name: /contribute/i }),
    ).toBeInTheDocument();
  });

  it("displays the star count fetched from the GitHub API", async () => {
    render(<GitHubActions />);

    await waitFor(() => {
      expect(screen.getByText("42")).toBeInTheDocument();
    });
  });

  it("does not render a star count if the fetch fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network error"));
    render(<GitHubActions />);

    await waitFor(() => {
      expect(screen.queryByText("42")).not.toBeInTheDocument();
    });
  });
});
