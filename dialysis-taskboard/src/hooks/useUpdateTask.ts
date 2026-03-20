import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api/tasks";
import type { Task, UpdateTaskPayload } from "../types";
import { describe, it, expect, vi, beforeEach } from "vitest";
export const useUpdateTask = (patientId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["tasks", patientId];

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTaskPayload }) =>
      updateTask(id, payload),

    // 1. Optimistically update the cache before the request fires
    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<Task[]>(queryKey);

    queryClient.setQueryData<Task[]>(queryKey, (old: Task[] | undefined) =>
  (old ?? []).map((t) =>
    t.id === id ? ({ ...t, ...payload } as Task) : t
  )
);

      return { previous }; // snapshot for rollback
    },

    // 2. If server errors → roll back to snapshot
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },

    // 3. Always refetch after settle to sync with server truth
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};