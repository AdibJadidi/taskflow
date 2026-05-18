export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  label: string;
  createdAt: Date;
}
