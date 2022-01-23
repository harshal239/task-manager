import React from "react";
import { AddTask } from "../components";

const AddTaskPage = ({ addTask }) => {
  return (
    <div className="w-full flex justify-center mt-4">
      <AddTask addTask={addTask} />
    </div>
  );
};

export default AddTaskPage;
