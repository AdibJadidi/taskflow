import TaskFilters from "@/features/tasks/components/TaskFilters";
import TaskSidebar from "@/features/tasks/components/TaskSidebar";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`flex h-screen ${geistSans.variable} ${geistMono.variable}`}
    >
      <aside className="hidden md:flex flex-col w-72 bg-zinc-900 text-zinc-100">
        <div className="p-6 ">
          <span className="font-bold text-xl tracking-tight text-indigo-500">
            Task
          </span>
          <span className="font-bold text-xl tracking-tight ">Flow</span>
        </div>
      </aside>
      <main className="flex flex-1 flex-col p-3">
        <header className="h-16 flex items-center justify-between">
          <div>Workspace A </div>
          <TaskFilters />
        </header>
        <section>{children}</section>
      </main>
    </div>
  );
};

export default DashboardLayout;
