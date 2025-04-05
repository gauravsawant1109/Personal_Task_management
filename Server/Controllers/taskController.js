import Task from '../models/taskModel.js';

const createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, userId: req.user.id });
    await task.save();
    res.status(201).json({ message: 'task created successfully !!', task });
  } catch (error) {
    res.status(500).json({ message: 'error creating Task ', error: error.message });
  }
};


const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({tasks:tasks});
  } catch (error) {
    res.status(500).json({ message: 'error fetching tasks', error: error.message });
  }
};


const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: 'task not found !!' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'error fetching task', error: error.message });
  }
};


const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ message: 'task does  not found' });
    res.status(200).json({ message: 'task updated successfully !!', updatedTask });
  } catch (error) {
    res.status(500).json({ message: 'error updating task', error: error.message });
  }
};


const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};

const getTasksByUserId = async (req, res) => {
    try {
      const  userId  = req.user.id; 
      const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
  };
  
  const filterTasks = async (req, res) => {
    try {
      const { category, priority, status, title } = req.query; 
      let filter = { userId: req.user.id }; 
  
      if (category) filter.category = category;
      if (priority) filter.priority = priority;
      if (status) filter.status = status;
      if (title) filter.title = { $regex: title, $options: 'i' }; 
  
      const tasks = await Task.find(filter).sort({ createdAt: -1 });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error filtering tasks', error: error.message });
    }
  };
  

export default {createTask,getTasks,deleteTask,updateTask,getTaskById,getTasksByUserId,filterTasks}