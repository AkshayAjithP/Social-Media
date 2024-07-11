require("dotenv").config();
require("express-async-errors");
//express
const express = require("express");
const app = express();

//other packages

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
//database
const connectDB = require("./db/connect");

//routers
const authRouter = require("./routes/authRoutes");

//middleware

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser("yourSecretKey"));
app.get("/", (req, res) => {
  res.send("Social media");
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}....`));
  } catch (error) {
    app.listen;
  }
};

start();
