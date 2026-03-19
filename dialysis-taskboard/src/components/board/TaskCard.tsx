import type { Task, TaskStatus } from "../../types";
import { useUpdateTask } from "../../hooks/useUpdateTask";

const STATUS_CYCLE: Record<TaskStatus, TaskStatus> = {
  todo: "in_progress",
  in_progress: "done",
  done: "todo",
};

const STATUS_LABEL: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

const STATUS_COLOR: Record<TaskStatus, string> = {
  todo: "#6b7280",
  in_progress: "#2563eb",
  done: "#16a34a",
};

interface Props {
  task: Task;
}

export function TaskCard({ task }: Props) {
  const { mutate, isPending } = useUpdateTask(task.patientId);

  const cycleStatus = () => {
    mutate({ id: task.id, payload: { status: STATUS_CYCLE[task.status] } });
  };

  const isOverdue =
    task.dueDate &&
    task.status !== "done" &&
    task.dueDate < new Date().toISOString().split("T")[0];

  return (
    <div style={{
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      padding: "10px 12px",
      marginBottom: 8,
      background: "#fff",
      opacity: isPending ? 0.6 : 1,
      transition: "opacity 0.2s",
    }}>
      <div style={{ fontWeight: 600, fontSize: 14 }}>{task.title}</div>

      {task.role && (
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
          {task.role.replace("_", " ")}
        </div>
      )}

      {task.dueDate && (
        <div style={{
          fontSize: 12,
          color: isOverdue ? "#dc2626" : "#6b7280",
          marginTop: 2,
        }}>
          {isOverdue ? "⚠ Overdue · " : ""}{task.dueDate}
        </div>
      )}

      <button
        onClick={cycleStatus}
        disabled={isPending}
        style={{
          marginTop: 8,
          padding: "3px 10px",
          borderRadius: 12,
          border: "none",
          background: STATUS_COLOR[task.status],
          color: "#fff",
          fontSize: 12,
          cursor: "pointer",
        }}
      >
        {STATUS_LABEL[task.status]}
      </button>
    </div>
  );
}