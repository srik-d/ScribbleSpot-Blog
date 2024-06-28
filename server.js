const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//env config
dotenv.config();

//routes import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
//for user api
app.use("/api/user", userRoutes);
//for blogs
app.use("/api/blog", blogRoutes);

//Port
const PORT = process.env.PORT || 2020;

//listen
app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} port no ${PORT}`.bgMagenta.black
  );
});
