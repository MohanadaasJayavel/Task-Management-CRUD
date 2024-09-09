const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");
const connectDB = require("./configs/db.configs");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.ENGINE_PORT, () => {
  console.log(`Server running at http://localhost:${process.env.ENGINE_PORT}`);
});
