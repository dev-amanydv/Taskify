import { useEffect, useState } from "react";
import { Check, Calendar, Edit, Trash } from "lucide-react";
import { useGetTodos, useUpdateTodo, useDeleteTodo } from "../hooks/useGetTodos";
import { useAuthContext } from "../context/AuthContext";

// const sampleTasks = [
//   { id: 1, title: "Go to gym", isCompleted: false, due: null },
//   { id: 2, title: "Go to School", isCompleted: false, due: null },
//   { id: 3, title: "Go to college", isCompleted: false, due: null },
//   { id: 4, title: "Go to home", isCompleted: false, due: null },
//   { id: 5, title: "Go to pub", isCompleted: false, due: null },
//   { id: 6, title: "Go to bathroom", isCompleted: false, due: null },
// ];

export default function TaskList({ refreshKey }) {
  const {authUser} = useAuthContext();
  const {loading, getTodos} = useGetTodos();
  const {updateTodo} = useUpdateTodo();
  const { deleteTodo } = useDeleteTodo();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await getTodos();
      console.log("res: ", res)
      if (res) {
        const validTodos = res.filter(t => typeof t.title === "string");
        setTasks(validTodos);
      } else {
        console.warn("No tasks received from backend:", res);
      }
    };
    fetchTodos();
  }, [refreshKey]);
  useEffect(() => {
    console.log("Updated tasks:", tasks);
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
      if (filter == "Active") return !task.isCompleted;

      if (filter == "Completed") return task.isCompleted;
      return true;
    })
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()));

    const toggleTask = async (id) => {
      const target = tasks.find((t) => t._id === id);
      if (!target) return;
    
      const updatedStatus = !target.isCompleted;
    
      // Update UI immediately
      setTasks((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, isCompleted: updatedStatus } : t
        )
      );
    
      // Update in backend
      await updateTodo(id, target.title, updatedStatus);
    };
    // if(loading){
    //   return (
    //     <div>
    //       loading...
    //     </div>
    //   )
    // }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-3">
        {["All", "Active", "Completed"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md text-sm ${
              filter === tab
                ? "bg-white text-black font-semibold shadow-sm"
                : "text-gray-500"
            }`}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full mb-3 px-4 py-2 rounded-md border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Task List */}
      <div className="space-y-2">
        {filteredTasks.map((task, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between p-3 rounded-md border ${
              task.isCompleted ? "bg-gray-200" : "bg-white"
            }`}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={task.isCompleted} 
                onChange={(e) => toggleTask(task._id)}
                className="w-5 h-5 text-teal-500 rounded focus:ring-0 border border-gray-300"
              />
              {editingTaskId === task._id ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="text-sm px-2 py-1 border border-gray-300 rounded"
                />
              ) : (
                <span
                  className={`text-sm ${
                    task.isCompleted
                      ? "line-through text-gray-400"
                      : "text-black"
                  }`}
                >
                  {task.title}
                </span>
              )}
              {task.due && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" /> {task.due}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500 cursor-pointer" />
              <Edit
                className="w-4 h-4 text-gray-500 cursor-pointer"
                onClick={() => {
                  setEditingTaskId(task._id);
                  setEditedTitle(task.title);
                }}
              />
              {editingTaskId === task._id && (
                <button
                  className="text-xs text-blue-500 px-2 py-1 border rounded"
                  onClick={async () => {
                    await updateTodo(task._id, editedTitle, task.isCompleted);
                    setTasks(prev =>
                      prev.map(t =>
                        t._id === task._id ? { ...t, title: editedTitle } : t
                      )
                    );
                    setEditingTaskId(null);
                  }}
                >
                  Save
                </button>
              )}
              <Trash
                className="w-4 h-4 text-rose-400 cursor-pointer"
                onClick={async () => {
                  const confirmed = window.confirm("Are you sure you want to delete this task?");
                  if (!confirmed) return;

                  await deleteTodo(task._id);
                  setTasks(prev => prev.filter(t => t._id !== task._id));
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function ClockIcon(props) {
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
