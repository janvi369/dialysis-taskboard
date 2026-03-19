import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/tasks";
import type { CreateTaskPayload } from "../types";

export const useCreateTask = (patientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => createTask(patientId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", patientId] });
    },
  });
};