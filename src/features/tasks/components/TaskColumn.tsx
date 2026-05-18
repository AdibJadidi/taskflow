import React from "react";
import { Task } from "../types";
import DraggableTaskCard from "./DraggableTaskCard";
import { useDroppable } from "@dnd-kit/core";
import SortableTaskCard from "./SortableTaskCard";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
const TaskColumn = ({
  id,
  title,
  tasks,
  onEditTask,
}: {
  id: string;
  title: string;
  tasks: Task[];
  onEditTask: Function;
}) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className="min-h-[500px]">
      <div className="flex justify-center">
        {title} {tasks.length}
      </div>
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {tasks.map((task: Task) => (
            <SortableTaskCard
              key={task?.id}
              task={task}
              onEdit={() => onEditTask(task)}
            />
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-10 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-600 text-xs">
              No tasks
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default TaskColumn;
