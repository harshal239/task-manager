const express = require("express");

const app = express();
const port = 4000;
const tasks = require("./routes/tasksRoutes");
const connectDB = require("./db/connect");
const cors = require("cors");
require("dotenv/config");

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/v1/tasks", tasks);

app.get("/", (req, res) => {
  res.send("Home Page");
});

const start = async () => {
  try {
    await connectDB(process.env.CONNECT_DB);
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}/`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
