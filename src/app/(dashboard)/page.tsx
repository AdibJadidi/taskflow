import TaskBoard from "@/features/tasks/components/TaskBoard";

export default function Home() {
  return (
    <div className="flex flex-col dark:bg-black">
      <TaskBoard />
    </div>
  );
}
