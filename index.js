import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import Connection from "./database/db.js";
import Router from "./routes/route.js";

dotenv.config();

const app = express();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);

app.use(express.static("frontend/build"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
);

const URL =
  process.env.MONGO_URI ||
  `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.bf4wlro.mongodb.net/?retryWrites=true&w=majority`;

Connection(URL);