import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();

// middleware for parsing the request body
app.use(express.json());

// Middleware for handeling CORS POLICY
// Option 1 Allow all origin with Default CORS(*)
app.use(cors());
// Option 1 Allow custom origin

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome Mr AD");
});

app.use("/books", booksRoute);
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App Connected Database");
    app.listen(PORT, () => {
      console.log(`App is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
