import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../types";
import TaskCard from "./TaskCard";

const SortableTaskCard = ({
  task,
  onEdit,
}: {
  task: Task;
  onEdit: Function;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="touch-none"
    >
      <TaskCard task={task} onEdit={onEdit} />
    </div>
  );
};

export default SortableTaskCard;
