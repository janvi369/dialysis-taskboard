import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../api/tasks";

export const usePatients = () =>
  useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });