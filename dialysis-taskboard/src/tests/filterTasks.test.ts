import { describe, it, expect } from "vitest";
import { filterTasks } from "../utils/filterTasks";
import type { Task } from "../types";

const tasks: Task[] = [
  { id: "1", patientId: "p1", title: "Blood Test", status: "todo", role: "nurse", dueDate: "2020-01-01" },
  { id: "2", patientId: "p1", title: "Diet Review", status: "in_progress", role: "dietician", dueDate: "2099-12-31" },
  { id: "3", patientId: "p1", title: "Social Check", status: "done", role: "social_worker" },
];

describe("filterTasks", () => {
  it("returns all tasks when no filters active", () => {
    expect(filterTasks(tasks, [], "all", "")).toHaveLength(3);
  });

  it("filters by single role", () => {
    const result = filterTasks(tasks, ["nurse"], "all", "");
    expect(result).toHaveLength(1);
    expect(result[0].role).toBe("nurse");
  });

  it("filters overdue tasks", () => {
    const result = filterTasks(tasks, [], "overdue", "");
    expect(result.every((t) => t.dueDate && t.dueDate < new Date().toISOString().split("T")[0])).toBe(true);
  });

  it("filters upcoming tasks", () => {
    const result = filterTasks(tasks, [], "upcoming", "");
    expect(result.every((t) => t.dueDate && t.dueDate > new Date().toISOString().split("T")[0])).toBe(true);
  });

  it("filters by search query (case insensitive)", () => {
    const result = filterTasks(tasks, [], "all", "blood");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Blood Test");
  });

  it("combines role and time filters", () => {
    const result = filterTasks(tasks, ["nurse"], "overdue", "");
    expect(result).toHaveLength(1);
  });
});