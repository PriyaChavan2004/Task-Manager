// backend 
const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const auth = require("../middleware/auth"); //ensures only loggedin users can access

// Get all todos for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch todos" });
  }
});

// Create a new todo
router.post("/", auth, async (req, res) => {
  try {
    const { todo, date } = req.body;
    const newTodo = new Todo({
      todo,
      date,
      user: req.user,  
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: "Failed to create todo" });
  }
});

// Update a todo
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user }, //  only update if user  it
      req.body,
      { new: true }
    );
    if (!updatedTodo) return res.status(404).json({ message: "Todo not found" });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: "Failed to update todo" });
  }
});

// Delete a todo
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });
    if (!deleted) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete todo" });
  }
});

module.exports = router;
