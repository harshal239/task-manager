import React, { useState, useEffect } from "react";
import { Task, Loader, Message } from "../components";
import { useTasksQuery } from "../services/TaskApi";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const { data, isLoading } = useTasksQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("all");

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const sortArrayAscending = (type) => {
    const types = {
      priority: "priority",
    };
    const sortProperty = types[type];
    const sorted = [...data].sort((a, b) => a[sortProperty] - b[sortProperty]);
    setTasks(sorted);
  };
  const sortArrayDescending = (type) => {
    const types = {
      priority: "priority",
    };
    const sortProperty = types[type];
    const sorted = [...data].sort((a, b) => b[sortProperty] - a[sortProperty]);
    setTasks(sorted);
  };

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setTasks(data?.filter((task) => task.status === true));
        break;
      case "incomplete":
        setTasks(data?.filter((task) => task.status === false));
        break;
      case "phl":
        sortArrayDescending("priority");
        break;
      case "plh":
        sortArrayAscending("priority");
        break;
      default:
        setTasks(data);
        break;
    }
  };

  useEffect(() => {
    filterHandler();
  }, [data, status]);
  useEffect(() => {
    setTasks(data);
    const filteredTasks = data?.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks(filteredTasks);
  }, [data, searchTerm]);

  return (
    <>
      <div className="w-full mx-4 md:w-1/2  flex flex-col mt-4">
        <div className="flex gap-4">
          <input
            className=" appearance-none w-full border-2 border-gray-300 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="title"
            type="text"
            name="title"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder="Enter title to search..."
          />
          <select
            className="rounded border-2 border-gray-300 text-gray-400 py-2 px-4 focus:border-purple-500 focus:outline-none focus:text-black"
            onChange={statusHandler}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
            <option value="phl">Priority: High to Low</option>
            <option value="plh">Priority : Low to High</option>
          </select>
        </div>

        <div className="w-full justify-center flex flex-wrap my-4 gap-4">
          {isLoading && <Loader />}
          {tasks?.length > 0 ? (
            tasks?.map((taskD) => <Task key={taskD._id} taskDetails={taskD} />)
          ) : (
            <Message message="No Tasks Found" />
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
