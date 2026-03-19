import { http, HttpResponse } from "msw";

type TaskBody = {
  title: string;
  status: string;
  role: string;
  dueDate: string;
};

let tasks = [
  {
    id: "1",
    patientId: "1",
    title: "Blood Test",
    status: "todo",
    role: "nurse",
    dueDate: "2026-03-20",
  },
];

export const handlers = [
  http.get("/patients", () => {
    return HttpResponse.json([{ id: "1", name: "John Doe" }]);
  }),

  http.get("/patients/:id/tasks", ({ params }) => {
    const patientTasks = tasks.filter(t => t.patientId === String(params.id));
    return HttpResponse.json(patientTasks);
  }),

  http.post("/patients/:id/tasks", async ({ params, request }) => {
    const body = (await request.json()) as TaskBody;
    const newTask = {
      id: Date.now().toString(),
      patientId: String(params.id), // ← use actual param, not hardcoded "1"
      ...body,
    };
    tasks.push(newTask);
    return HttpResponse.json(newTask, { status: 201 });
  }),

  http.patch("/tasks/:id", async ({ params, request }) => {
    const body = (await request.json()) as Partial<TaskBody>;
    tasks = tasks.map(t =>
      t.id === String(params.id) ? { ...t, ...body } : t
    );
    const updated = tasks.find(t => t.id === String(params.id));
    return HttpResponse.json(updated ?? {});
  }),
];