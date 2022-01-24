import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateTaskMutation, useTaskQuery } from "../services/TaskApi";

/**
 * *Component for Edit Task
 */

const EditTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    priority: "",
    status: false,
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [updateTask] = useUpdateTaskMutation();
  const { data: singleTask, refetch } = useTaskQuery(id);

  //*Function for async updating of the task
  const updateHandler = async () => {
    await updateTask({ id, ...task });
  };

  //*Function to handle changes in the form fields
  const handleChange = (e) => {
    e.preventDefault();
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleCheckBox = (e) => {
    setTask({ ...task, [e.target.name]: e.target.checked });
  };

  const convertToLocal = (date) => {
    let newDate = new Date(date);
    let month = newDate.getMonth();
    let date1 = newDate.getDate();
    let hour = newDate.getUTCHours();
    let minutes = newDate.getUTCMinutes();

    newDate = `${newDate.getFullYear()}-${
      month < 10 ? `0${month + 1}` : month + 1
    }-${date1 < 10 ? `0${date1}` : date1}T${hour < 10 ? `0${hour}` : hour}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`;
    return newDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      task.title === "" ||
      task.startTime === "" ||
      task.endTime === "" ||
      task.priority === ""
    ) {
      alert("All fields are required");
    } else {
      updateHandler();
      navigate("/");
    }
  };

  useEffect(() => {
    refetch();
    if (singleTask) {
      setTask({
        title: singleTask.title,
        description: singleTask.description,
        startTime: convertToLocal(singleTask.startTime),
        endTime: convertToLocal(singleTask.endTime),
        priority: singleTask.priority,
        status: singleTask.status,
      });
    }
  }, [singleTask]);

  return (
    <>
      <form className="w-full max-w-sm" onSubmit={(e) => handleSubmit(e)}>
        <div className="md:flex md:items-center md:justify-start mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="title"
            >
              Title
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className=" appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="title"
              type="text"
              name="title"
              value={task.title}
              onChange={(e) => handleChange(e)}
              placeholder="Enter title here..."
              required
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-password"
            >
              Description
            </label>
          </div>
          <div className="md:w-2/3">
            <textarea
              className=" appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              cols="20"
              rows="5"
              name="description"
              value={task.description}
              onChange={(e) => handleChange(e)}
              placeholder="Enter description of the task..."
            ></textarea>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="start time"
            >
              Start time
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="datetime-local"
              className=" appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              name="startTime"
              value={task.startTime}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="End time"
            >
              End time
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="datetime-local"
              className=" appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              name="endTime"
              value={task.endTime}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="priority"
            >
              Priority
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="number"
              className=" appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              placeholder="Enter prority for the task..."
              name="priority"
              value={task.priority}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="priority"
            >
              Status
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="checkbox"
              className="h-4 w-4 rounded-sm checked:border-purple-500 checked:bg-purple-500 mr-2 mt-1 align-top"
              name="status"
              checked={task.status}
              onChange={handleCheckBox}
            />
            <label className="inline-block text-gray-800" htmlFor="complete">
              Complete
            </label>
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Update Task
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditTask;
