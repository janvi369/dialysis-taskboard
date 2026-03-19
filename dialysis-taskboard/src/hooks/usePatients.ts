import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../api/tasks";
import type { Patient } from "../types/patient"; // ← add this import

export const usePatients = () =>
  useQuery<Patient[]>({          // ← add Patient[] generic
    queryKey: ["patients"],
    queryFn: getPatients,
  });