"use client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useTaskStore } from "../store/TaskStore";

const TaskFilters = () => {
  const setSearchQuery = useTaskStore((state) => state.setSearchQuery);
  const setProirityFilter = useTaskStore((state) => state.setProirityFilter);
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localSearchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearchQuery]);

  return (
    <div className="flex items-center gap-2">
      <div className="flex bg-indigo-50 h-8 p-1 border border-indigo-300 rounded">
        <input
          className="text-indigo-800 border-0 focus:outline-none  focus:ring-indigo-500 text-sm"
          onChange={(e) => setLocalSearchQuery(e?.target?.value)}
        />
        <Search className="text-indigo-600" />
      </div>
      <div>
        <select
          name="Priority"
          id=""
          className="bg-indigo-50 h-8 border border-indigo-300 rounded text-indigo-500"
          onChange={(e) => setProirityFilter(e.target.value)}
        >
          <option>ALL</option>
          <option>HIGH</option>
          <option>MEDIUM</option>
          <option>LOW</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilters;
