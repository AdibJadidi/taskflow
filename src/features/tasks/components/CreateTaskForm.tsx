import React, { useState } from "react";
import { useTaskStore } from "../store/TaskStore";
import { useForm } from "react-hook-form";
import { TaskFormValues, taskSchema } from "../schema/TaskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Priority, Task } from "../types";

const CreateTaskForm = ({
  onSuccess,
  task,
}: {
  onSuccess: () => void;
  task?: Task;
}) => {
  const addTask = useTaskStore((state) => state.addTask);
  const editTask = useTaskStore((state) => state.updateTask);

  const [priority, setPriority] = useState<Priority>(
    task?.priority || "MEDIUM",
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      priority: task?.priority || "MEDIUM",
      title: task?.title || "",
      description: task?.description || "",
      label: task?.label || "",
    },
  });

  const onSubmit = (data: TaskFormValues) => {
    console.log("data", data);

    if (task)
      editTask(task?.id, {
        ...data,
        priority,
      });
    else
      addTask({
        ...data,
        id: new Date().toString(),
        status: "TODO",
        createdAt: new Date(),
      });
    onSuccess();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Title"
        {...register("title")}
        className="bg-indigo-200 p-1 rounded"
      />
      <input
        type="text"
        placeholder="Description"
        {...register("description")}
        className="bg-indigo-200 p-1 rounded"
      />
      <input
        type="text"
        placeholder="Label"
        {...register("label")}
        className="bg-indigo-200 p-1 rounded"
      />
      <select
        name="Priority"
        id=""
        className="bg-indigo-200 h-8 border border-indigo-700 rounded text-indigo-800"
        onChange={(e) => setPriority(e?.target?.value as Priority)}
        value={priority}
      >
        <option>URGENT</option>
        <option>HIGH</option>
        <option>MEDIUM</option>
        <option>LOW</option>
      </select>
      <div className="flex justify-center">
        <Button type="submit" className="bg-indigo-700 cusror-pointer">
          {task ? "Edit Task" : "Add Task"}
        </Button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
