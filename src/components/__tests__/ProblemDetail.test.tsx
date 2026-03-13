import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ProblemDetail } from "../ProblemDetail";
import { mockProblem } from "../../test/fixtures";

vi.mock("react-syntax-highlighter", () => ({
  Prism: ({ children }: { children: string }) => <pre>{children}</pre>,
}));

vi.mock("react-syntax-highlighter/dist/esm/styles/prism", () => ({
  oneLight: {},
  vscDarkPlus: {},
}));

describe("ProblemDetail", () => {
  describe("when problem is null", () => {
    it("renders the empty state message", () => {
      render(<ProblemDetail problem={null} theme="dark" />);

      expect(
        screen.getByText("No problem matches the current filters."),
      ).toBeInTheDocument();
    });
  });

  describe("when a problem is provided", () => {
    it("renders the problem title", () => {
      render(<ProblemDetail problem={mockProblem} theme="dark" />);

      expect(screen.getByText("Two Sum")).toBeInTheDocument();
    });

    it("renders all strategy steps", () => {
      render(<ProblemDetail problem={mockProblem} theme="dark" />);

      for (const step of mockProblem.strategy) {
        expect(screen.getByText(step)).toBeInTheDocument();
      }
    });

    it("renders all pitfalls", () => {
      render(<ProblemDetail problem={mockProblem} theme="dark" />);

      for (const pitfall of mockProblem.pitfalls) {
        expect(screen.getByText(pitfall)).toBeInTheDocument();
      }
    });

    it("renders time and space complexity", () => {
      render(<ProblemDetail problem={mockProblem} theme="dark" />);

      // Both time and space are O(n) in the fixture — assert at least two occurrences
      expect(screen.getAllByText("O(n)").length).toBeGreaterThanOrEqual(2);
    });

    it("renders the code block", () => {
      render(<ProblemDetail problem={mockProblem} theme="dark" />);

      expect(screen.getByText(/def two_sum/)).toBeInTheDocument();
    });

    describe("copy button", () => {
      let mockWriteText: ReturnType<typeof vi.fn>;

      beforeEach(() => {
        mockWriteText = vi.fn().mockResolvedValue(undefined);
        Object.defineProperty(navigator, "clipboard", {
          value: { writeText: mockWriteText },
          writable: true,
          configurable: true,
        });
      });

      afterEach(() => {
        vi.restoreAllMocks();
      });

      it("shows 'Copy' initially", () => {
        render(<ProblemDetail problem={mockProblem} theme="dark" />);

        expect(screen.getByRole("button", { name: /copy/i })).toHaveTextContent(
          "Copy",
        );
      });

      it("changes to 'Copied' after clicking and then reverts", async () => {
        vi.useFakeTimers();
        render(<ProblemDetail problem={mockProblem} theme="dark" />);

        // Use fireEvent to avoid userEvent waiting on the async click handler
        await act(async () => {
          screen.getByRole("button", { name: /copy/i }).click();
        });

        expect(screen.getByRole("button")).toHaveTextContent("Copied");

        act(() => {
          vi.advanceTimersByTime(1500);
        });

        expect(screen.getByRole("button")).toHaveTextContent("Copy");
        vi.useRealTimers();
      });

      it("writes problem code to clipboard on copy", async () => {
        render(<ProblemDetail problem={mockProblem} theme="dark" />);

        await act(async () => {
          screen.getByRole("button", { name: /copy/i }).click();
        });

        expect(mockWriteText).toHaveBeenCalledOnce();
        expect((mockWriteText.mock.calls[0][0] as string).trim()).toBe(
          mockProblem.code.trim(),
        );
      });
    });
  });
});
