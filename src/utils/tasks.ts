import { Task } from "@/features/tasks/types";

export const taskList: Task[] = [
  {
    id: "task-1",
    title: "Drag & Drop",
    description: "This is a description",
    status: "TODO",
    priority: "URGENT",
    label: "Feature",
    createdAt: new Date(),
  },
  {
    id: "task-2",
    title: "Fix Responsive Sidebar Bugs",
    description: "Fix responsive sidebar bugs",
    status: "IN_PROGRESS",
    priority: "HIGH",
    label: "Bug",
    createdAt: new Date(),
  },
  {
    id: "task-3",
    title: "Optimize Dashboard Images",
    description: "Use webp format and Image component in Next.js.",
    status: "DONE",
    priority: "LOW",
    label: "Refactor",
    createdAt: new Date(),
  },
  {
    id: "task-4",
    title: "Add Dark Mode",
    description: "Add dark mode to the application.",
    status: "TODO",
    priority: "HIGH",
    label: "Feature",
    createdAt: new Date(),
  },
];
