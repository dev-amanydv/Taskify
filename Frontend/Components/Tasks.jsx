import Navbar from './Navbar'
import React, { useState } from "react";
import TaskList from "./Tasklist";
import { useCreateTodo} from "../hooks/useGetTodos";
function Tasks() {
    const {createTodo} = useCreateTodo()
    const [newTask, setNewTask] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);
    const totalTasks = 5;
    const completedTasks = 3; 
    const dueToday = 1;
    const remainingTasks = totalTasks - completedTasks;
    const progressPercent = (completedTasks/totalTasks)*100;
  return (
    <div>
      <Navbar/>
       <div className='p-3 mt-15'>
                      <div className="flex flex-col">
                        <span className="text-2xl font-semibold">Task Management</span>
                        <span className="text-gray-500">Add, edit, and manage your tasks here</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <input onChange={(e) =>{setNewTask(e.target.value)}} type="text" placeholder="Add a new task..." className="bg-sky-100 rounded-sm p-2 w-70/100 my-5 border-1 border-gray-300" />
                        <button onClick={async () =>{
                          await createTodo(newTask);
                          setRefreshKey(prev => prev + 1); // trigger refresh
                        }} className="flex items-center bg-sky-700 py-2 rounded-md px-3 text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus h-5 w-5 mr-1" data-lov-id="src/components/AddTaskForm.tsx:47:8" data-lov-name="Plus" data-component-path="src/components/AddTaskForm.tsx" data-component-line="47" data-component-file="AddTaskForm.tsx" data-component-name="Plus" data-component-content="%7B%22className%22%3A%22h-5%20w-5%20mr-1%22%7D"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>Add Task</button>
                      </div>
                      <div className="shadow-xl border-1 border-gray-300 rounded-md ">
                        <div className="flex justify-between px-3 pt-3">
                          <h2 className="font-medium">Task Progress</h2>
                          <span className="text-gray-500">{completedTasks} of {totalTasks} tasks</span>
                        </div>
                        <div className="px-3 pt-2">
                          <div className="h-2 transition-all rounded-full bg-teal-600" style={{width: `${progressPercent}%`}}></div>
                        </div>
                        <div className="flex justify-around my-3 p-3 ">
                          <div className="flex rounded-lg py-9 px-14 flex-col h-10 p-8 bg-blue-100 justify-center items-center">
                            <span className="text-2xl font-bold  ">{dueToday}</span>
                            <span className="text-gray-600">Due Today</span>
                          </div>
                          <div className="flex rounded-lg py-9 px-14 flex-col h-10 p-8 bg-blue-100 justify-center items-center">
                            <span className="text-2xl font-bold  ">{remainingTasks}</span>
                            <span className="text-gray-600">Remaining</span>
                          </div>
                        </div>
                      </div>
                      <TaskList refreshKey={refreshKey}/>
                    </div>
    </div>
  )
}

export default Tasks
