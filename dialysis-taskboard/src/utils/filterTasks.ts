import type { Task, Role, TimeFilter } from "../types";

const today = () => new Date().toISOString().split("T")[0];

export function filterTasks(
  tasks: Task[],
  roles: Role[],
  timeFilter: TimeFilter,
  searchQuery: string
): Task[] {
  return tasks.filter((task) => {
    // Role filter — empty means show all
    if (roles.length > 0 && task.role && !roles.includes(task.role)) return false;

    // Time filter
    if (timeFilter !== "all" && task.dueDate) {
      const due = task.dueDate;
      const todayStr = today();
      if (timeFilter === "overdue" && due >= todayStr) return false;
      if (timeFilter === "due_today" && due !== todayStr) return false;
      if (timeFilter === "upcoming" && due <= todayStr) return false;
    }

    // Search
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;

    return true;
  });
}