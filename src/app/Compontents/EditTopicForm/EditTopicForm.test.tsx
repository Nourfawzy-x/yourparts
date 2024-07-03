// tests/EditTopicForm.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import EditTopicForm from "./page";
import "@testing-library/jest-dom";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

test("renders EditTopicForm with initial values", () => {
  render(
    <EditTopicForm
      _id="1"
      name="ahmed"
      email="ahmed@example.com"
      phone="01234567890"
    />
  );

  expect(screen.getByLabelText(/student name/i)).toHaveValue("ahmed");
  expect(screen.getByLabelText(/student email/i)).toHaveValue(
    "ahmed@example.com"
  );
  expect(screen.getByLabelText(/phone/i)).toHaveValue("01234567890");
});

test("handles form submission", async () => {
  render(
    <EditTopicForm
      _id="1"
      name="ahmed"
      email="ahmed@example.com"
      phone="01234567890"
    />
  );

  fireEvent.change(screen.getByLabelText(/student name/i), {
    target: { value: "ahmed" },
  });
  fireEvent.change(screen.getByLabelText(/student email/i), {
    target: { value: "ahmed@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/phone/i), {
    target: { value: "01234567890" },
  });

  fireEvent.click(screen.getByRole("button", { name: /edit student/i }));

  await screen.findByText(/loading/i);

  await screen.findByText(/student updated successfully/i);
});
