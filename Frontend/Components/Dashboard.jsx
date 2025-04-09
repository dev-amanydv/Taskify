import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Logout from "./Logout";
import AddTodo from "./AddTodo";
import Navbar from "./Navbar";

function Dashboard() {
  const { authUser } = useAuthContext();
  const [activeTab, setActiveTab] = useState('All Tasks');
  const tabs = ['All Tasks', 'Today', 'Upcoming', 'Overdue'];
  const totalTasks = 5;
  const completedTasks = 3;
  const dueToday = 1;
  const remainingTasks = totalTasks - completedTasks;
  const progressPercent = (completedTasks/totalTasks)*100;
  return (
    <div>
        <Navbar/>
        <div className="p-3">
          <div className=" mt-15 flex items-center gap-4 p-3">
            <img src={authUser.profilePic} className="rounded-full " alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-3xl font-[Outfit]">Welcome, {authUser.fullName}</span>
              <span className="text-gray-700 text-lg">Manage your tasks efficiently.</span>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg mt-3 pl-5">
            <div className="flex items-center gap-1 text-lg font-semibold"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock h-5 w-5 text-teal-600" data-lov-id="src/pages/Dashboard.tsx:65:16" data-lov-name="Clock" data-component-path="src/pages/Dashboard.tsx" data-component-line="65" data-component-file="Dashboard.tsx" data-component-name="Clock" data-component-content="%7B%22className%22%3A%22h-5%20w-5%20text-primary%22%7D"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> <div>Today's Tasks</div></div>
            <div className="text-sm text-gray-700">Tasks due today</div>
            <div className="font-bold text-4xl  pt-3">23</div>
          </div>
          <div className="bg-white p-3 rounded-lg mt-3 pl-5">
            <div className="flex items-center gap-1 text-lg font-semibold"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar h-5 w-5 text-teal-600" data-lov-id="src/pages/Dashboard.tsx:77:16" data-lov-name="Calendar" data-component-path="src/pages/Dashboard.tsx" data-component-line="77" data-component-file="Dashboard.tsx" data-component-name="Calendar" data-component-content="%7B%22className%22%3A%22h-5%20w-5%20text-primary%22%7D"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg> <div>Upcoming</div></div>
            <div className="text-sm text-gray-700">Future Tasks</div>
            <div className="font-bold text-4xl pt-3 ">23</div>
          </div>
          <div className="bg-white p-3 rounded-lg mt-3 pl-5">
            <div className="flex items-center gap-1 text-lg font-semibold"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-alert h-5 w-5  text-red-500" data-lov-id="src/pages/Dashboard.tsx:89:16" data-lov-name="AlertCircle" data-component-path="src/pages/Dashboard.tsx" data-component-line="89" data-component-file="Dashboard.tsx" data-component-name="AlertCircle" data-component-content="%7B%22className%22%3A%22h-5%20w-5%20text-destructive%22%7D"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg> <div>Overdue</div></div>
            <div className="text-sm text-gray-700">Tasks past their due date</div>
            <div className="font-bold text-4xl  pt-3">23</div>
          </div>
        </div>
        <div className="p-3">
          <div className="bg-sky-700 p-2 rounded-lg text-white">
           {tabs.map((tab)=>(
            <button key={tab} onClick={()=> setActiveTab(tab)} className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 
              ${activeTab == tab? 'bg-white text-black shadow': 'text-gray-300 hover:text-indigo-200'}`}>{tab}</button>
           ))}
          </div>
          <div className="mt-3 bg-white rounded-lg  p-5  ">
            {activeTab == 'All Tasks'? (
              <div>
                <div className="flex flex-col">
                  <span className="text-2xl font-semibold">Task Management</span>
                  <span className="text-gray-500">Add, edit, and manage your tasks here</span>
                </div>
                <div className="flex items-center justify-between">
                  <input type="text" placeholder="Add a new task..." className="bg-sky-100 rounded-sm p-2 w-70/100 my-5 border-1 border-gray-300" />
                  <button className="flex items-center bg-sky-700 py-2 rounded-md px-3 text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus h-5 w-5 mr-1" data-lov-id="src/components/AddTaskForm.tsx:47:8" data-lov-name="Plus" data-component-path="src/components/AddTaskForm.tsx" data-component-line="47" data-component-file="AddTaskForm.tsx" data-component-name="Plus" data-component-content="%7B%22className%22%3A%22h-5%20w-5%20mr-1%22%7D"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>Add Task</button>
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
              </div>):null}
            {activeTab == 'Today'? (<div>Today</div>): null}
            {activeTab == 'Upcoming'? (<div>Upcoming</div>): null}
            {activeTab == 'Overdue'? (<div>Overdue</div>):null}

          </div>
          
        </div>

      </div>
      
  );
}

export default Dashboard;
