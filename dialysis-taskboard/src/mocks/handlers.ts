import { http } from "msw";

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
    return Response.json([{ id: "1", name: "John Doe" }]);
  }),

  http.get("/patients/:id/tasks", () => {
    return Response.json(tasks);
  }),

  http.patch("/tasks/:id", async ({ params, request }) => {
    const { id } = params;
    const body: any = await request.json();

    tasks = tasks.map((t) =>
      t.id === id ? { ...t, ...body } : t
    );

    return Response.json({ success: true });
  }),
];