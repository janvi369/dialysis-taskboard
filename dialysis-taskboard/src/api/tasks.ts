import { api } from "./client";

export const getTasks = (patientId: string) =>
  api.get(`/patients/${patientId}/tasks`);

export const updateTask = (id: string, data: any) =>
  api.patch(`/tasks/${id}`, data);