import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";
import TaskList from "./Tasklist";
import { useCreateTodo, useGetTodos } from "../hooks/useGetTodos";
import { Clock, Calendar, AlertCircle, Plus, CheckCircle, BarChart2 } from 'lucide-react';


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
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-4 w-full max-w-5xl mx-auto fade-in">
\        <div className="relative mt-16 p-8 rounded-2xl shadow-lg overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative flex items-center gap-6">
            <img src={authUser.profilePic} className="rounded-full h-24 w-24 border-4 border-white shadow-md" alt="Profile" />
            <div>
              <h1 className="font-bold text-4xl font-[Outfit]">Welcome, {authUser.fullName}</h1>
              <p className="text-lg opacity-90">Ready to conquer your tasks for the day?</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl shadow-md hover-lift transition-transform duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Today's Tasks</h3>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-100">
                <Clock className="w-6 h-6 text-teal-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500">Tasks due today</p>
            <div className="font-bold text-5xl text-gray-900 mt-3">N/A</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md hover-lift transition-transform duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Upcoming</h3>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500">Tasks in the future</p>
            <div className="font-bold text-5xl text-gray-900 mt-3">N/A</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md hover-lift transition-transform duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Overdue</h3>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500">Tasks past their due date</p>
            <div className="font-bold text-5xl text-gray-900 mt-3">N/A</div>
          </div>
        </div>
      </div>
      <div className="p-4 max-w-5xl mx-auto w-full">
        <div className="bg-white p-2 flex justify-center rounded-full shadow-sm text-gray-700">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 
              ${activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}>{tab}</button>
          ))}
        </div>
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          {activeTab === 'All Tasks' && (
            <div>
              <div className="flex flex-col mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Task Management</h2>
                <p className="text-gray-500">Add, edit, and manage your tasks here.</p>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <input onChange={(e) => { setNewTask(e.target.value) }} type="text" placeholder="Add a new task..." className="bg-gray-100 rounded-lg p-4 w-full border-2 border-transparent focus:border-blue-500 focus:ring-0 transition" />
                <button onClick={async () => {
                  await createTodo(newTask);
                  setRefreshKey(prev => prev + 1);
                }} className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 py-4 px-6 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  <Plus className="h-6 w-6 mr-2" />Add Task</button>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg text-gray-800">Task Progress</h3>
                  <span className="text-gray-500 font-medium">{completedTasks} of {totalTasks} tasks</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-teal-400 to-blue-500 transition-width duration-500" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <div className="flex justify-around mt-6">
                  <div className="flex flex-col items-center p-4 rounded-lg bg-blue-50 w-1/2 mx-2">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-2">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-3xl font-bold text-gray-900">{completedTasks}</span>
                    <span className="text-gray-600">Completed</span>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg bg-purple-50 w-1/2 mx-2">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 mb-2">
                      <BarChart2 className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-3xl font-bold text-gray-900">{remainingTasks}</span>
                    <span className="text-gray-600">Remaining</span>
                  </div>
                </div>
              </div>
              <TaskList refreshKey={refreshKey} />
            </div>)}
          {activeTab === 'Today' && (<div className="text-2xl text-center font-semibold text-gray-500 p-16">Coming Soon...</div>)}
          {activeTab === 'Upcoming' && (<div className="text-2xl text-center font-semibold text-gray-500 p-16">Coming Soon...</div>)}
          {activeTab === 'Overdue' && (<div className="text-2xl text-center font-semibold text-gray-500 p-16">Coming Soon...</div>)}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;