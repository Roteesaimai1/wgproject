const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const bodyParser = require("body-parser");
const employeeR = require("./routes/employee");


//Set bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Set Cors
const corsset = { //set CORS เพื่ออนุญาติให้เข้าถึง API
  origin: 'http://localhost:5173', //port vue js **ipที่อนุญาติให้ใช้***
  credentials: true,
};
app.use(cors(corsset));

//Server Check
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

//Set Path
app.use("/api/employee", employeeR);


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