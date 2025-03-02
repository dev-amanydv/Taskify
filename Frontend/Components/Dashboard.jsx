import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Logout from "./Logout";

function Dashboard() {
  const { authUser } = useAuthContext();
  return (
    <div>
      <div className="header">
        <div className="nav">
          <div className="nav1">
            <div className="logo">
              <i className="fa-regular fa-square-check"></i>
            </div>
            <div className="logo-name">
              <div className="name">Taskify</div>
              <div className="slogan">Get Things Done, Stress-Free.</div>
            </div>
          </div>
          <div className="nav2 text-lg">
            {authUser ? (
              <div className="profile flex items-center gap-2">
                <img
                  className="w-10 h-10"
                  src={`${authUser.profilePic}`}
                  alt=""
                />
                <span className="mr-3"> {authUser.fullName}</span>
                <Logout />
              </div>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </div>
        </div>
      </div>
      <div className="dashboard my-15 flex flex-col items-center mx-5">
        <div className="search-todo ">
          <label className="input m-auto ">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" className="grow w-50" placeholder="Search" />
            <kbd className="kbd kbd-sm">⌘</kbd>
            <kbd className="kbd kbd-sm">K</kbd>
          </label>
        </div>
        <div className=" input-todo text-2xl font-[Outfit] " >
            <span>Want to add a Todo? </span>
            <button className="">Add a Todo</button>
        </div>
        <div className="todo-info grid grid-cols-2 my-10 gap-10 h-30 ">
          <div className="todos-created px-10 text-2xl font-semibold flex bg-green-200 items-center justify-center  shadow-2xl rounded-xl">
            Total No. of Todos created:
          </div>
          <div className="todos-done bg-green-200 shadow-2xl rounded-xl px-10 text-2xl font-semibold flex items-center justify-center">
            Total Mark as Done: 0
          </div>
        </div>

        <div className="Todo-completed"></div>
        <div className="todo-graph"></div>
      </div>
    </div>
  );
}

export default Dashboard;
