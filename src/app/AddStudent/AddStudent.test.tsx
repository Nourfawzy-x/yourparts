import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AddTopic from "./page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

describe("AddStudent", () => {
  it("renders the form correctly", () => {
    render(<AddTopic />);

    expect(screen.getByLabelText(/student name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/student email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/student phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/student date/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /add student/i })
    ).toBeInTheDocument();
  });

  it("handles form submission", async () => {
    render(<AddTopic />);

    fireEvent.change(screen.getByLabelText(/student name/i), {
      target: { value: "nour fawzy" },
    });
    fireEvent.change(screen.getByLabelText(/student email/i), {
      target: { value: "nourfawzy@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/student phone/i), {
      target: { value: "02220001" },
    });
    fireEvent.change(screen.getByLabelText(/student date/i), {
      target: { value: "2024-07-03" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add student/i }));
    expect(screen.getByLabelText(/student name/i)).toHaveValue("nour fawzy");
    expect(screen.getByLabelText(/student email/i)).toHaveValue(
      "nourfawzy@gmail.com"
    );
    expect(screen.getByLabelText(/student phone/i)).toHaveValue("02220001");
    expect(screen.getByLabelText(/student date/i)).toHaveValue("2024-07-03");
  });
});
