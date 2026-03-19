import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/tasks";

export const usePatientTasks = (patientId: string) =>
  useQuery({
    queryKey: ["tasks", patientId],
    queryFn: () => getTasks(patientId),
    enabled: !!patientId,
  });