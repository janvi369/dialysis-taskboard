import { useState } from "react";
import type { Role, TaskStatus } from "../../types";
import { useCreateTask } from "../../hooks/useCreateTask";

interface Props {
  patientId: string;
  onClose: () => void;
}

export function CreateTaskModal({ patientId, onClose }: Props) {
  const { mutate, isPending, isError } = useCreateTask(patientId);
  const [title, setTitle] = useState("");
  const [role, setRole] = useState<Role>("nurse");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    mutate(
      { title, status: "todo" as TaskStatus, role, dueDate: dueDate || undefined },
      { onSuccess: onClose }
    );
  };

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 100,
    }}>
      <div style={{
        background: "#fff", borderRadius: 12,
        padding: 24, minWidth: 340,
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
      }}>
        <h2 style={{ margin: "0 0 16px", fontSize: 18 }}>New Task</h2>

        <label style={{ display: "block", marginBottom: 12 }}>
          <div style={{ fontSize: 13, marginBottom: 4, fontWeight: 600 }}>Title *</div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Monthly blood test"
            style={{ width: "100%", padding: "7px 10px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14 }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 12 }}>
          <div style={{ fontSize: 13, marginBottom: 4, fontWeight: 600 }}>Role</div>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            style={{ width: "100%", padding: "7px 10px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14 }}
          >
            <option value="nurse">Nurse</option>
            <option value="dietician">Dietician</option>
            <option value="social_worker">Social Worker</option>
          </select>
        </label>

        <label style={{ display: "block", marginBottom: 16 }}>
          <div style={{ fontSize: 13, marginBottom: 4, fontWeight: 600 }}>Due Date</div>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={{ width: "100%", padding: "7px 10px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14 }}
          />
        </label>

        {isError && (
          <div style={{ color: "#dc2626", fontSize: 13, marginBottom: 12 }}>
            ⚠ Failed to create task. Please try again.
          </div>
        )}

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "7px 16px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer" }}>
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending || !title.trim()}
            style={{ padding: "7px 16px", borderRadius: 6, border: "none", background: "#1e40af", color: "#fff", fontWeight: 600, cursor: "pointer", opacity: isPending ? 0.6 : 1 }}
          >
            {isPending ? "Creating…" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}