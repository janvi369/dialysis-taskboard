import { usePatients } from "./hooks/usePatients";
import { PatientRow } from "./components/board/PatientRow";
import { FilterBar } from "./components/FilterBar";

function App() {
  const { data: patients = [], isLoading, isError } = usePatients();

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: "#1e40af" }}>
        🏥 Dialysis Care Taskboard
      </h1>

      <FilterBar />

      {isLoading && <div>Loading patients…</div>}
      {isError && <div style={{ color: "#dc2626" }}>⚠ Failed to load patients. Check your connection.</div>}
      {patients.map((p) => (
        <PatientRow key={p.id} patient={p} />
      ))}
    </div>
  );
}

export default App;