const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const employeeR = require("./routes/employeeRoutes");
const userRoutes = require("./routes/userRoutes");

//Set bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Server Check
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

//Set Path
app.use("/api/employee", employeeR);
app.use("/api/user", userRoutes);

//Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});