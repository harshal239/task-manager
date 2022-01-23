import React from "react";
import { Link } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";
import { MdViewList } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="w-full bg-purple-100 p-4 mx-auto flex justify-between items-center">
      <h1 className="text-xl md:text-3xl font-bold">Task Manager</h1>
      <div className="flex flex-row gap-2 ">
        <Link to="/addtask">
          <button className=" px-2 py-1 md:font-medium border-purple-500 text-purple-500 border-2 bg-white md:px-3 md:py-2 rounded mr-2 flex items-center gap-2 hover:bg-purple-500 hover:text-white">
            Add Task
            <AiFillFileAdd size={20} />
          </button>
        </Link>
        <Link to="/">
          <button className="px-2 py-1 md:font-medium bg-purple-500 border-2 text-white md:px-3 md:py-2 rounded flex items-center gap-2 hover:bg-white hover:text-purple-500 hover:border-purple-500">
            View Tasks
            <MdViewList size={20} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
