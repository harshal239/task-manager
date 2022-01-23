import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { HomePage, AddTaskPage, EditTaskPage } from "./Pages";

function App() {
  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addtask" element={<AddTaskPage />} />
          <Route path="/:id" element={<EditTaskPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
