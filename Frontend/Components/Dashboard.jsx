import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";
import TaskList from "./Tasklist";
import { useCreateTodo, useGetTodos } from "../hooks/useGetTodos";

function Dashboard() {
  const { loading: createTodoLoading, createTodo } = useCreateTodo();
  const { loading: getTodosLoading, getTodos } = useGetTodos();
  const { authUser } = useAuthContext();
  const [activeTab, setActiveTab] = useState('All Tasks');
  const [newTask, setNewTask] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const todos = await getTodos();
      if (todos) {
        setTasks(todos);
      }
    };
    fetchTasks();
  }, [refreshKey]);

  const tabs = ['All Tasks', 'Today', 'Upcoming', 'Overdue'];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const remainingTasks = totalTasks - completedTasks;
  const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;


  return (
    <div>
      <Navbar />
      <div className="p-3 w-full max-w-3xl mx-auto">
        <div className=" mt-15 flex items-center gap-4 p-3">
          <img src={authUser.profilePic} className="rounded-full h-40 " alt="" />
          <div className="flex flex-col">
            <span className="font-bold text-3xl font-[Outfit]">Welcome, {authUser.fullName}</span>
            <span className="text-gray-700 text-lg">Manage your tasks efficiently.</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 md:gap-4">
          <div className="bg-white p-3 rounded-lg mt-3 pl-5">
            <div className="flex items-center gap-1 text-lg font-semibold"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock h-5 w-5 text-teal-600"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> <div>Today's Tasks</div></div>
            <div className="text-sm text-gray-700">Tasks due today</div>
            <div className="font-bold text-4xl  pt-3">N/A</div>
          </div>
          <div className="bg-white p-3 rounded-lg mt-3 pl-5">
            <div className="flex items-center gap-1 text-lg font-semibold"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar h-5 w-5 text-teal-600"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg> <div>Upcoming</div></div>
            <div className="text-sm text-gray-700">Future Tasks</div>
            <div className="font-bold text-4xl pt-3 ">N/A</div>
          </div>
          <div className="bg-white p-3 rounded-lg mt-3 pl-5">
            <div className="flex items-center gap-1 text-lg font-semibold"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-alert h-5 w-5  text-red-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg> <div>Overdue</div></div>
            <div className="text-sm text-gray-700">Tasks past their due date</div>
            <div className="font-bold text-4xl  pt-3">N/A</div>
          </div>
        </div>
      </div>
      <div className="p-3 max-w-3xl mx-auto w-full">
        <div className="bg-[#eeeeee] p-2 rounded-lg text-white">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 cursor-pointer py-2 rounded-lg font-medium transition-colors duration-200 
              ${activeTab === tab ? 'bg-white text-black shadow' : 'text-gray-500 hover:text-gray-500'}`}>{tab}</button>
          ))}
        </div>
        <div className="mt-3 bg-white rounded-lg  p-5  ">
          {activeTab === 'All Tasks' && (
            <div>
              <div className="flex flex-col">
                <span className="text-2xl font-semibold">Task Management</span>
                <span className="text-gray-500">Add, edit, and manage your tasks here</span>
              </div>
              <div className="flex items-center gap-10 justify-between">
                <input onChange={(e) => { setNewTask(e.target.value) }} type="text" placeholder="Add a new task..." className="bg-gray-100 rounded-sm p-2 w-full my-5 border-1 border-gray-300" />
                <button onClick={async () => {
                  await createTodo(newTask);
                  setRefreshKey(prev => prev + 1); 
                }} className="flex min-w-30 items-center bg-sky-700 py-2 rounded-md px-3 text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus h-5 w-5 mr-1"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>Add Task</button>
              </div>
              <div className="shadow-xl border-1 border-gray-300 rounded-md ">
                <div className="flex justify-between px-3 pt-3">
                  <h2 className="font-medium">Task Progress</h2>
                  <span className="text-gray-500">{completedTasks} of {totalTasks} tasks</span>
                </div>
                <div className="px-3 pt-2">
                  <div className="h-2 transition-all duration-500 ease-out rounded-full bg-teal-600" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <div className="flex justify-around my-3 p-3 ">
                  <div className="flex rounded-lg py-9 px-14 flex-col h-10 p-8 bg-blue-100 justify-center items-center">
                    <span className="text-2xl font-bold  ">{completedTasks}</span>
                    <span className="text-gray-600">Due Today</span>
                  </div>
                  <div className="flex rounded-lg py-9 px-14 flex-col h-10 p-8 bg-blue-100 justify-center items-center">
                    <span className="text-2xl font-bold  ">{remainingTasks}</span>
                    <span className="text-gray-600">Remaining</span>
                  </div>
                </div>
              </div>
              <TaskList refreshKey={refreshKey} />
            </div>)}
          {activeTab === 'Today' && (<div>Today</div>)}
          {activeTab === 'Upcoming' && (<div>Upcoming</div>)}
          {activeTab === 'Overdue' && (<div>Overdue</div>)}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;