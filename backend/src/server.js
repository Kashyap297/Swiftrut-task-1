const express = require("express");
const dbConnection = require("./config/db");
const cors = require("cors");
const Config = require("./config");
const router = require("./router/userRoute");
var bodyParser = require("body-parser");
const userRoutes = require("./router/userRoute");
const taskRoutes = require("./router/tasksRoute");

const app = express();

const PORT = Config.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the user routes
// app.use("/api/users", router);

// Routes
app.use("/api/users", userRoutes); // User authentication and management
app.use("/api/tasks", taskRoutes); // Task management

// dbConnection
dbConnection();

app.listen(PORT, (err) => {
  if (err) {
    console.log(err, "server is not Connected");
  }
  console.log(`listening on port : http://localhost:${PORT}`);
});
