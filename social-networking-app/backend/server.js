import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.send("Api is running");
});
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mod on port ${PORT}`.yellow.bold
  )
);
