export type TaskStatus = "todo" | "in_progress" | "done";

export type Role = "nurse" | "dietician" | "social_worker";

export interface Task {
  id: string;
  patientId: string;
  title: string;

  status: TaskStatus;

  role?: Role;
  dueDate?: string;
}