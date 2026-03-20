## How the UI Evolves for New Roles or Task Types

### Adding a New Role (e.g. "pharmacist")

Only 3 files need to change:

**1. `src/types/task.ts`**
```ts
// Before
export type Role = "nurse" | "dietician" | "social_worker";

// After
export type Role = "nurse" | "dietician" | "social_worker" | "pharmacist";
```

**2. `src/components/FilterBar.tsx`**
```ts
// Just add to the array — button appears automatically
const ROLES: Role[] = ["nurse", "dietician", "social_worker", "pharmacist"];
```

**3. `src/components/board/CreateTaskModal.tsx`**
```tsx
// Add one option to the dropdown
<option value="pharmacist">Pharmacist</option>
```

No changes needed to hooks, React Query, Zustand, or any other component.

---

### Adding a New Task Type (e.g. "physio_assessment")

Only 2 files need to change:

**1. `src/types/task.ts`**
```ts
export type TaskCategory =
  | "lab_work"
  | "access_check"
  | "diet_counselling"
  | "vaccination"
  | "social_work"
  | "physio_assessment";  // ← add here
```

**2. `src/components/board/CreateTaskModal.tsx`**
```tsx
<option value="physio_assessment">Physio Assessment</option>
```

---

### Why so few changes?

The architecture is designed so that:
- **Types are the single source of truth** — change the type, TypeScript 
  flags every place that needs updating
- **UI components map from data** — filter buttons and dropdowns render 
  from arrays, not hardcoded JSX
- **Hooks and queries are role/category agnostic** — they work on `Task` 
  objects regardless of what fields contain