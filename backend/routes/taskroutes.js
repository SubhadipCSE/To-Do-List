//crud operations / rest api
const express = require("express");
const router = express.Router();

const Task = require("../models/task");

// Take input from user form frontend and connection to the frontend
router.get("/", async (req, res) => {
  // res.sendFile(__dirname + "/frontend/index.html");
  const tasks = await Task.find();
  res.json(tasks);
});
// saving new tasks
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title not found it very dorkari are required." });
  }

  try {
    const newTask = new Task({ title, description });
   const savedTask = await newTask.save();
    res.status(200).json({ message: "Task created successfully", task: savedTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({ message: "creating task error radhe radhe" });
  }
});
 
//  on completing task
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { iscompleted } = req.body;
  // if (!isCompleted) {
  //   return res.status(400).json({ message: "Updated value not found" });
  // }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { iscompleted: iscompleted },
      { new: true }
    );

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.error("Task failed to be updated", error);
  res.status(400).json({ message: "Task failed to be updated" });
  }
});

// task delete (use .findByIdAndDelete() method)

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(400).json({ message: "Deleting task error" });
  }
});
 
module.exports = router;