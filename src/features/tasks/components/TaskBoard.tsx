"use client";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useTaskStore } from "../store/TaskStore";
import TaskColumn from "./TaskColumn";
import { useEffect, useState } from "react";
import { Task } from "../types";
import TaskCard from "./TaskCard";
import TaskSidebar from "./TaskSidebar";
import { Plus } from "lucide-react";
const COLUMNS = [
  { id: "TODO", label: "Todo" },
  { id: "IN_PROGRESS", label: "In Progress" },
  { id: "DONE", label: "Done" },
] as const;
const TaskBoard = () => {
  const [isMounted, setIsMounted] = useState(false);
  const tasks = useTaskStore((state) => state.tasks);
  const searchQuery = useTaskStore((state) => state.searchQuery);
  const proirityFilter = useTaskStore((state) => state.proirityFilter);
  const updateStatus = useTaskStore((state) => state.updateTaskStatus);
  const reorderTasks = useTaskStore((state) => state.reorderTasks);
  const displayedTasks = tasks.filter((task) => {
    const matchesSearch = task?.title
      ?.toLowerCase()
      ?.includes(searchQuery?.toLowerCase());
    const matchesFilter =
      proirityFilter === "ALL" || task?.priority?.includes(proirityFilter);
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editableTask, setEditableTask] = useState<Task | undefined>(undefined);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = displayedTasks.find((t) => t.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as any;
    const activeTask = displayedTasks.find((t) => t.id === activeId);
    const overTask = displayedTasks.find((t) => t.id === overId);

    if (COLUMNS.some((col) => col.id === overId)) {
      if (activeTask && activeTask.status !== overId) {
        updateStatus(activeId, overId as any);
      }
      return;
    }
    if (activeTask && overTask) {
      if (activeTask.status !== overTask.status) {
        updateStatus(activeId, overTask.status);
      }
      reorderTasks(activeId, overId);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditableTask(task);
    setIsSidebarOpen(true);
  };

  if (!isMounted) return null;
  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <TaskSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        task={editableTask}
      />

      <div>
        {" "}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer px-4 py-2 rounded-lg transition-all shadow-lg shadow-indigo-500/20"
        >
          <Plus size={18} />
          <span>New Task</span>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-1.5  ">
        {COLUMNS?.map((column) => (
          <TaskColumn
            key={column.id}
            id={column.id}
            title={column.label}
            tasks={displayedTasks.filter((task) => task.status === column?.id)}
            onEditTask={handleEditTask}
          />
        ))}
      </div>
      <DragOverlay
        dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: { active: { opacity: "0.5" } },
          }),
        }}
      >
        {activeTask ? (
          <div className="cursor-grabbing">
            <TaskCard task={activeTask} onEdit={() => {}} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TaskBoard;
