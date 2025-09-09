require("dotenv").config();
const express = require("express");
const connectDatabase = require("./config/database");
const userRouter = require("./routes/user");
const captainRouter = require("./routes/captain");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.VITE_APP_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/captain", captainRouter);

app.get("/", (req, res) => {
  res.json(`Server is up and running...`);
});

connectDatabase()
  .then(() => {
    console.log(`Database connected successfully...`);
    app.listen(PORT, () => {
      console.log(`Sever is listening on PORT:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`messate:${err}`);
  });
