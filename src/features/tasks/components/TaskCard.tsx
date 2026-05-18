import React from "react";
import { Task } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTaskStore } from "../store/TaskStore";
import { Edit3, Trash2 } from "lucide-react";

const TaskCard = ({ task, onEdit }: { task: Task; onEdit: Function }) => {
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENT":
        return "bg-red-200 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-400";
      case "HIGH":
        return "bg-orange-200 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-400";
      case "MEDIUM":
        return "bg-amber-200 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-400";
      default:
        return "bg-green-200 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400";
    }
  };
  return (
    <Card className=" flex flex=col bg-indigo-50 border border-indigo-200 hover:border-indigo-300 min-h-52 transition-all cursor-grab active:cursor-grabbing">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex gap-1">
          <Badge variant="outline" className={getPriorityColor(task.priority)}>
            {task.priority}
          </Badge>
          {task.label && (
            <Badge variant="secondary" className="text-[12px]">
              {task.label}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-1 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation(); // جلوگیری از تداخل با درگ dnd-kit
              console.log("onEdit");

              onEdit();
            }}
            className="text-zinc-500 hover:text-indigo-600 p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            title="Edit Task"
          >
            <Edit3 size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // جلوگیری از تداخل با درگ dnd-kit
              if (confirm("آیا از حذف این تسک مطمئن هستید؟")) {
                deleteTask(task.id);
              }
            }}
            className="text-zinc-500 hover:text-red-600 p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            title="Delete Task"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-sm font-semibold">{task.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {task.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
