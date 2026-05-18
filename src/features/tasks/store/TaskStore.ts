import { taskList } from "@/utils/tasks";
import { create } from "zustand";
import { Task } from "../types";
import { arrayMove } from "@dnd-kit/sortable";
import { createJSONStorage, persist } from "zustand/middleware";

interface TaskState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  proirityFilter: string;
  setProirityFilter: (query: string) => void;
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updateFields: Partial<Task>) => void;
  updateTaskStatus: (taskId: string, newStatus: Task["status"]) => void;
  reorderTasks: (activeId: string, overId: string) => void;
}
export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: taskList,
      setTasks: (tasks: Task[]) => set({ tasks }),
      searchQuery: "",
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      proirityFilter: "ALL",
      setProirityFilter: (query: string) => set({ proirityFilter: query }),

      addTask: (newTask: Task) =>
        set((state) => ({
          tasks: [...state.tasks, newTask],
        })),

      deleteTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      updateTask: (id, updateFields) =>
        set((state) => ({
          tasks: state.tasks.map((task: Task) =>
            task.id === id ? { ...task, ...updateFields } : task,
          ),
        })),
      updateTaskStatus: (taskId, newStatus) =>
        set((state) => ({
          tasks: state.tasks.map((task: Task) =>
            task.id === taskId ? { ...task, status: newStatus } : task,
          ),
        })),

      reorderTasks: (activeId: string, overId: string) =>
        set((state) => {
          const activeIndex = state.tasks.findIndex(
            (task) => task.id === activeId,
          );
          const overIndex = state.tasks.findIndex((task) => task.id === overId);

          if (activeIndex === -1 || overIndex === -1) return state;

          return {
            tasks: arrayMove(state.tasks, activeIndex, overIndex),
          };
        }),
    }),
    {
      name: "task-flow-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ tasks: state.tasks }),
    },
  ),
);
