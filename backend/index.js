//get (all task featch)
//post (add task)
//put (update task)
//delete (delete task)

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const uri =
  "mongodb+srv://Subhadip:Radhe@todo.4kdh86s.mongodb.net/?retryWrites=true&w=majority&appName=ToDO"; 
// backend/index.js

const app = express(); // Middleware

app.use(cors());
app.use(express.json());

// rest api

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
// make task --> first schema, then model, then add a new task

const taskRouter = require("./routes/taskroutes");
app.use("/api/tasks", taskRouter);




app.listen(3000, () => {
  console.log("Server is running http://localhost:3000");
});
