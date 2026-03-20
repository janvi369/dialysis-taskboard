import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUpdateTask } from "../hooks/useUpdateTask";
import * as taskApi from "../api/tasks";
import type { Task } from "../types";
import type { ReactNode } from "react";

const PATIENT_ID = "p1";
const QUERY_KEY = ["tasks", PATIENT_ID];

const mockTasks: Task[] = [
  { id: "1", patientId: PATIENT_ID, title: "Blood Test", status: "todo", role: "nurse" },
];

function makeWrapper(queryClient: QueryClient) {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("useUpdateTask optimistic update", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    queryClient.setQueryData(QUERY_KEY, mockTasks);
  });

  it("optimistically updates the cache before server responds", async () => {
    vi.spyOn(taskApi, "updateTask").mockResolvedValue(
      { ...mockTasks[0], status: "in_progress" }
    );

    const { result } = renderHook(() => useUpdateTask(PATIENT_ID), {
      wrapper: makeWrapper(queryClient),
    });

   
await act(async () => {
  result.current.mutate({ id: "1", payload: { status: "in_progress" } });
});

    // Cache updated immediately (optimistic)
    const cached = queryClient.getQueryData<Task[]>(QUERY_KEY);
    expect(cached?.[0].status).toBe("in_progress");
  });

  it("rolls back cache when server returns an error", async () => {
    vi.spyOn(taskApi, "updateTask").mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useUpdateTask(PATIENT_ID), {
      wrapper: makeWrapper(queryClient),
    });

    await act(async () => {
      result.current.mutate({ id: "1", payload: { status: "done" } });
      await new Promise((r) => setTimeout(r, 50));
    });

    // Cache rolled back to original
    const cached = queryClient.getQueryData<Task[]>(QUERY_KEY);
    expect(cached?.[0].status).toBe("todo");
  });
});