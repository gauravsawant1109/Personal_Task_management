import express from "express"

const TaskRouter = express.Router();
import taskController from "../Controllers/taskController.js";
import auth from "../middleware/auth.js" 

TaskRouter.post('/createTask', auth, taskController.createTask);
TaskRouter.get('/getTasks', auth, taskController.getTasks);
TaskRouter.get('/getTaskById/:id', auth, taskController.getTaskById);
TaskRouter.put('/updateTask/:id', auth, taskController.updateTask);
TaskRouter.delete('/deleteTask/:id', auth, taskController.deleteTask);
TaskRouter.get('/getTasksByUserId', auth, taskController.getTasksByUserId);
TaskRouter.get('/filter', auth, taskController.filterTasks);

export default TaskRouter;
