# Integration & Failure Modes

## State Management Rationale

**React Query** manages all server state (patients, tasks).
Chosen because:
- Built-in retry (configured to retry 2× on network failure)
- Automatic cache invalidation after mutations
- Optimistic update + rollback is a first-class pattern via `onMutate` / `onError`

**Zustand** manages UI-only filter state (role toggles, time filter, search query).
These have no server representation — putting them in React Query would be wrong.
Zustand is lightweight and avoids prop drilling across the component tree.

---

## Behavior Under Partial Failures

| Scenario | Behavior |
|---|---|
| `GET /patients` fails | Error message shown, React Query retries 2× with backoff |
| `GET /patients/:id/tasks` fails | Per-patient error shown, other patients unaffected |
| `PATCH /tasks/:id` fails | Optimistic update rolls back, original status restored instantly |
| `POST /patients/:id/tasks` fails | Modal shows error, no ghost task appears in board |
| Server returns unexpected fields | Extra fields ignored — TypeScript interfaces are compile-time only |
| Server omits optional fields (`role`, `dueDate`) | UI renders gracefully, no crash |
| Server returns invalid status string | Falls back to existing value, no crash |

---

## Optimistic Update Flow
```
User clicks status button
        │
        ▼
onMutate: snapshot current cache, apply update immediately
        │
        ▼
UI reflects new status instantly (no spinner, no wait)
        │
   ┌────┴────┐
   │         │
Server OK  Server ERROR
   │         │
   ▼         ▼
onSettled:  onError:
refetch     restore snapshot
            (rollback)
```

---

## Adding a New Role

1. Add to `Role` union in `src/types/task.ts`:
```ts
export type Role = "nurse" | "dietician" | "social_worker" | "pharmacist";
```
2. Add to `ROLES` array in `src/components/FilterBar.tsx` — appears in filter UI automatically
3. Add to role `<select>` in `src/components/board/CreateTaskModal.tsx`
4. No changes needed to hooks, store, or queries

---

## Adding a New Task Category

1. Add a `TaskCategory` type to `src/types/task.ts`
2. Add category field to `CreateTaskPayload`
3. Add a category filter to `FilterBar.tsx` using the same toggle pattern as roles
4. MSW handler persists it automatically via object spread

---

## Data Contract Decisions

**Why optional fields on Task?**
Backend may return incomplete data (legacy records, partial updates).
The app must not crash if `role` or `dueDate` is missing.

**Why snake_case in DTOs but camelCase in domain models?**
Servers typically return snake_case. Normalising at the API layer keeps
components clean and decoupled from backend naming conventions.

**Why patient ID in query key `["tasks", patientId]`?**
Ensures React Query caches tasks per patient independently.
Without it, all patients would share the same cache entry.