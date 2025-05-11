const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect.js");
const authRoutes = require("./routers/authRoutes.js");
const todoRoutes = require("./routers/todoRoutes.js")
const cors = require("cors");

//App
const app = express();

//Middlewares
app.use(express.json());

//Database connection
dbConnect();

// Cors
app.use(cors());

//routes
app.use("/api", authRoutes);
app.use('/api', todoRoutes);


//Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`sever is runnning on ${PORT}`);
});
