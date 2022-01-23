import React from "react";

const Message = ({ message }) => {
  return (
    <div className="w-full px-4 py-4 shadow-md rounded text-center text-2xl font-semibold">
      {message}
    </div>
  );
};

export default Message;
