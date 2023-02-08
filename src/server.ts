import express from "express";
import * as model from "./model.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(cors());
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_CONNECT);

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(model.getApiInstructions());
});

app.get("/employees", async (req: express.Request, res: express.Response) => {
  try {
    res.status(200).json(await model.getEmployees());
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get(
  "/employees/:id",
  async (req: express.Request, res: express.Response) => {
    try {
      const id = req.params.id;
      res.status(200).json(await model.getEmployee(id));
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
