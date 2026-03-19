import { useState } from "react";
import type { Patient, TaskStatus } from "../../types";
import { usePatientTasks } from "../../hooks/usePatientTasks";
import { useFilterStore } from "../../store/filterStore";
import { filterTasks } from "../../utils/filterTasks";
import { TaskColumn } from "./TaskColumn";
import { CreateTaskModal } from "./CreateTaskModal";

const STATUSES: TaskStatus[] = ["todo", "in_progress", "done"];

interface Props {
  patient: Patient;
}

export function PatientRow({ patient }: Props) {
  const { data: tasks = [], isLoading, isError, error } = usePatientTasks(patient.id);
  const { roles, timeFilter, searchQuery } = useFilterStore();
  const [showModal, setShowModal] = useState(false);

  const filtered = filterTasks(tasks, roles, timeFilter, searchQuery);

  return (
    <div style={{
      border: "1px solid #e5e7eb",
      borderRadius: 12,
      marginBottom: 20, 
      overflow: "hidden",
    }}>
      {/* Patient header */}
      <div style={{
        background: "#1e40af",
        color: "#fff",
        padding: "10px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div>
          <span style={{ fontWeight: 700 }}>{patient.name}</span>
          {patient.mrn && (
            <span style={{ fontSize: 12, opacity: 0.8, marginLeft: 10 }}>MRN: {patient.mrn}</span>
          )}
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            background: "#fff",
            color: "#1e40af",
            border: "none",
            borderRadius: 6,
            padding: "4px 12px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          + Add Task
        </button>
      </div>

      {/* Task columns */}
      <div style={{ padding: 12 }}>
        {isLoading && <div style={{ color: "#6b7280", padding: 8 }}>Loading tasks…</div>}
        {isError && (
          <div style={{ color: "#dc2626", padding: 8 }}>
            ⚠ Failed to load tasks: {(error as Error).message}
          </div>
        )}
        {!isLoading && !isError && (
          <div style={{ display: "flex", gap: 12 }}>
            {STATUSES.map((s) => (
              <TaskColumn
                key={s}
                status={s}
                tasks={filtered.filter((t) => t.status === s)}
              />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <CreateTaskModal patientId={patient.id} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}