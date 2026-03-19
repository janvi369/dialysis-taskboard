import type { Task, TaskStatus } from "../../types";
import { TaskCard } from "./TaskCard";

const COLUMN_LABELS: Record<TaskStatus, string> = {
  todo: "📋 To Do",
  in_progress: "🔄 In Progress",
  done: "✅ Done",
};

interface Props {
  status: TaskStatus;
  tasks: Task[];
}

export function TaskColumn({ status, tasks }: Props) {
  return (
    <div style={{
      flex: 1,
      minWidth: 220,
      background: "#f9fafb",
      borderRadius: 10,
      padding: 12,
    }}>
      <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 14 }}>
        {COLUMN_LABELS[status]}
        <span style={{
          marginLeft: 8, background: "#e5e7eb",
          borderRadius: 10, padding: "1px 8px", fontSize: 12, fontWeight: 400,
        }}>
          {tasks.length}
        </span>
      </div>
      {tasks.length === 0
        ? <div style={{ color: "#9ca3af", fontSize: 13 }}>No tasks</div>
        : tasks.map((t) => <TaskCard key={t.id} task={t} />)}
    </div>
  );
}