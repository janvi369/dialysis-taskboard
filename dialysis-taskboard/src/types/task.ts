export type TaskStatus = "todo" | "in_progress" | "done";

export type Role = "nurse" | "dietician" | "social_worker";
export type TimeFilter = "all" | "overdue" | "due_today" | "upcoming";
export interface Task {
  id: string;
  patientId: string;
  title: string;

  status: TaskStatus;

  role?: Role;
  dueDate?: string;
}

export interface CreateTaskPayload {
  title: string;
  status?: string;
  role?: string;
  dueDate?: string;
}

export interface UpdateTaskPayload {
  title?: string;
  status?: string;
  role?: string;
  dueDate?: string;
}