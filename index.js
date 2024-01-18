import express, { response } from "express";
const app = express();
import { DB } from "./models/bookmodel.js";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

app.use(express.json());

import cors from "cors";

app.use(cors())

app.get("/", (req, res) => {
  console.log(req);
  return response.status(234).send("Welcome to MERN Stack Tutorial");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(console.log("Connected to DB"))
  .catch((error) => console.log(error));
