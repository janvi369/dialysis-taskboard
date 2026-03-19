import type { Role, TimeFilter } from "../types";
import { useFilterStore } from "../store/filterStore";

const ROLES: Role[] = ["nurse", "dietician", "social_worker"];
const TIME_FILTERS: { value: TimeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "overdue", label: "⚠ Overdue" },
  { value: "due_today", label: "Today" },
  { value: "upcoming", label: "Upcoming" },
];

export function FilterBar() {
  const { roles, timeFilter, searchQuery, setRoles, setTimeFilter, setSearchQuery, reset } = useFilterStore();

  const toggleRole = (r: Role) =>
    setRoles(roles.includes(r) ? roles.filter((x) => x !== r) : [...roles, r]);

  return (
    <div style={{
      display: "flex", flexWrap: "wrap", gap: 12,
      alignItems: "center", marginBottom: 24,
      padding: "12px 16px",
      background: "#f9fafb",
      borderRadius: 10,
      border: "1px solid #e5e7eb",
    }}>
      {/* Role toggles */}
      <div style={{ display: "flex", gap: 6 }}>
        {ROLES.map((r) => (
          <button
            key={r}
            onClick={() => toggleRole(r)}
            style={{
              padding: "4px 12px", borderRadius: 20, fontSize: 13, cursor: "pointer",
              border: "1px solid",
              borderColor: roles.includes(r) ? "#1e40af" : "#d1d5db",
              background: roles.includes(r) ? "#1e40af" : "#fff",
              color: roles.includes(r) ? "#fff" : "#374151",
              fontWeight: 500,
            }}
          >
            {r.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Time filter */}
      <div style={{ display: "flex", gap: 6 }}>
        {TIME_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setTimeFilter(f.value)}
            style={{
              padding: "4px 12px", borderRadius: 20, fontSize: 13, cursor: "pointer",
              border: "1px solid",
              borderColor: timeFilter === f.value ? "#7c3aed" : "#d1d5db",
              background: timeFilter === f.value ? "#7c3aed" : "#fff",
              color: timeFilter === f.value ? "#fff" : "#374151",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks…"
        style={{
          padding: "5px 12px", borderRadius: 6, border: "1px solid #d1d5db",
          fontSize: 13, minWidth: 180,
        }}
      />

      {(roles.length > 0 || timeFilter !== "all" || searchQuery) && (
        <button
          onClick={reset}
          style={{ fontSize: 13, color: "#6b7280", background: "none", border: "none", cursor: "pointer" }}
        >
          Clear filters ✕
        </button>
      )}
    </div>
  );
}