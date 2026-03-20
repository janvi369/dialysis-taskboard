# Dialysis Care Taskboard

A frontend task management system for dialysis center staff.
Nurses, dieticians, and social workers can track, create, and update patient care tasks in real time.

---

## Setup Instructions
```bash
# 1. Clone the repo
git clone https://github.com/janvi369/dialysis-taskboard.git
cd dialysis-taskboard/dialysis-taskboard

# 2. Install dependencies
npm install

# 3. Initialize MSW mock service worker
npx msw init public/ --save

# 4. Start the app
npm run dev
```

Open `http://localhost:5174` in your browser.
No backend needed — MSW simulates all API calls in the browser.

---

## Architecture Overview
```
src/
├── types/          # Domain models (Task, Patient, Role, TaskStatus)
├── api/            # Axios client + typed API functions
├── mocks/          # MSW handlers (fake backend)
├── hooks/          # React Query hooks (usePatients, usePatientTasks,
│                   #   useUpdateTask, useCreateTask)
├── store/          # Zustand filter store (role, time, search)
├── components/
│   ├── board/      # TaskCard, TaskColumn, PatientRow, CreateTaskModal
│   └── FilterBar   # Role + time + search filters
└── utils/          # filterTasks (pure function)
```

### Data flow
```
MSW (fake backend)
      ↓
Axios API layer (src/api/tasks.ts)
      ↓
React Query hooks (cache + retry + optimistic update)
      ↓
Components (read from cache, mutate via hooks)
      ↑
Zustand (filter state only — no server data)
```

### State management decisions

| What | Tool | Why |
|---|---|---|
| Server data (patients, tasks) | React Query | Caching, retries, optimistic updates |
| UI filter state | Zustand | Lightweight, no server representation |

---

## Assumptions and Trade-offs

- **Single patient for now** — MSW seeds one patient (John Doe). 
  The architecture supports multiple patients; just add more to the handlers.
- **No authentication** — out of scope for this assignment.
- **MSW as backend** — real backend would be Express/FastAPI as described 
  in the assignment. API layer is fully decoupled so swapping is trivial.
- **Optional fields on Task** — `role` and `dueDate` are optional because 
  real backends may return incomplete data. The UI handles missing fields 
  gracefully without crashing.
- **React Query over Redux** — Redux would add significant boilerplate for 
  no benefit here. React Query handles server state better out of the box.

---

## Known Limitations and What I Would Do Next

| Limitation | What I'd do next |
|---|---|
| Only one patient seeded | Add more patients to MSW handlers |
| No persistent storage | Add localStorage or a real backend |
| No authentication | Add role-based login (nurse sees only nurse tasks) |
| No drag-and-drop | Add `@dnd-kit` for dragging tasks between columns |
| No due date validation | Prevent creating tasks with past due dates |
| Tests cover utils + hooks | Add component tests with React Testing Library |

---

## AI Usage

GitHub Copilot was used for boilerplate (type definitions, hook structure).
All architecture decisions, data contracts, and failure handling logic 
were written and reasoned through manually.