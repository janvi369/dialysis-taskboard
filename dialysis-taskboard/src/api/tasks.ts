import { api } from "./client";
import type { Task, CreateTaskPayload, UpdateTaskPayload } from "../types/task";

export const getPatients = () =>
  api.get("/patients").then((r) => r.data);

export const getTasks = (patientId: string): Promise<Task[]> =>
  api.get(`/patients/${patientId}/tasks`).then((r) => r.data);

export const createTask = (
  patientId: string,
  payload: CreateTaskPayload
): Promise<Task> =>
  api.post(`/patients/${patientId}/tasks`, payload).then((r) => r.data);

export const updateTask = (
  id: string,
  payload: UpdateTaskPayload
): Promise<Task> =>
  api.patch(`/tasks/${id}`, payload).then((r) => r.data);