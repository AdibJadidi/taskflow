import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../types";
import TaskCard from "./TaskCard";

const DraggableTaskCard = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="touch-none" // جلوگیری از تداخل اسکرول در موبایل
    >
      <TaskCard task={task} />
    </div>
  );
};

export default DraggableTaskCard;
