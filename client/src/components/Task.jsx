import React from "react";
import { Link } from "react-router-dom";
import { useDeleteTaskMutation } from "../services/TaskApi";
import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

/**
 * *Component for displaying single Task
 */

const Task = ({ taskDetails }) => {
  const [deleteTask] = useDeleteTaskMutation();

  const deleteHandler = async () => {
    await deleteTask(taskDetails._id);
  };

  return (
    <div className="w-full px-4 py-4 shadow-md rounded flex flex-col gap-2 bg-white">
      <h2 className="font-semibold">{taskDetails.title}</h2>
      <p>{taskDetails.description}</p>
      <h2>
        <span className="font-semibold">Start Date</span> :
        {moment(taskDetails.startTime).utc().format("lll")}
      </h2>
      <h2>
        <span className="font-semibold">End Date</span> :
        {moment(taskDetails.endTime).utc().format("lll")}
      </h2>
      <div className="flex justify-between gap-2">
        <button
          className={`${
            taskDetails.status ? "bg-green-400" : "bg-red-400"
          } text-white py-2 px-3 font-medium rounded-full`}
        >
          {taskDetails.status ? "Completed" : "Incomplete"}
        </button>
        <Link to={`/${taskDetails._id}`}>
          <button className="  border-blue-400 text-blue-500  border-2  py-2 px-3 font-medium rounded flex items-center gap-2">
            Edit
            <AiFillEdit size={20} />
          </button>
        </Link>
        <button
          className=" border-red-400 text-red-400 border-2  py-2 px-3 font-medium rounded flex items-center gap-2"
          onClick={deleteHandler}
        >
          Delete
          <AiFillDelete size={20} />
        </button>
      </div>
    </div>
  );
};

export default Task;
