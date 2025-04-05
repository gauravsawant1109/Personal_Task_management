import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import colors from "colors";
import userRouter from "./Routes/userRoutes.js";
import TaskRouter from "./Routes/taskRoutes.js";

dotenv.config();

const app = express();

// MongoDB Connection
mongoose
  .connect(
    process.env.MONGO_DB_URL,
    // "mongodb://localhost:27017/Task",
     {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connection Succeeded.".blue))
  .catch((error) => console.log("Error in DB connection: ".red, error));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRouter);
app.use("/task",TaskRouter)

// image path
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

console.log("Root Directory:", __dirname);

// Server Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App running on port: ${PORT}`.yellow));
