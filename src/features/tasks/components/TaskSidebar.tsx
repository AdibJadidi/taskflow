"use client";
import CreateTaskForm from "./CreateTaskForm";
import { Task } from "../types";

const TaskSidebar = ({
  isOpen,
  setIsOpen,
  task,
}: {
  isOpen: Boolean;
  setIsOpen: Function;
  task?: Task;
}) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 flex flex-col gap-3.5 w-full h-full max-w-md bg-black z-50 transform transition-transform duration-300 ease-in-out p-4 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center text-indigo-400">
          <div>
            <h2>{task ? "Edit task" : "Create new task"}</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-indigo-400 cursor-pointer"
          >
            X
          </button>
        </div>
        <CreateTaskForm
          onSuccess={() => setIsOpen(false)}
          task={task}
          key={task?.id || "new-task"}
        />
      </div>
    </>
  );
};

export default TaskSidebar;
