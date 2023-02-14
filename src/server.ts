import express from "express";
import * as model from "./model.js";
import mongoose from "mongoose";
import cors from "cors";
import { IEmployee } from "./interfaces.js";
import { error404, sendErrorTiClient } from "./models/404.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
// route error, 404
app.use(error404, sendErrorTiClient);
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_CONNECT);

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(model.getApiInstructions());
});

app.get("/employees", async (req: express.Request, res: express.Response) => {
  try {
    res.status(200).json(await model.getEmployees());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get(
  "/employee/:id",
  async (req: express.Request, res: express.Response) => {
    try {
      const id: string = req.params.id;
      res.status(200).json(await model.getEmployee(id));
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

app.post("/employee", async (req: express.Request, res: express.Response) => {
  try {
    const employee: IEmployee = req.body;
    console.log(employee);

    const result = await model.addEmployee(employee);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete(
  "/employee/:id",
  async (req: express.Request, res: express.Response) => {
    try {
      const id = req.params.id;

      res.status(200).json(await model.deleteEmployee(id));
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

app.patch(
  "/employee/:id",
  async (req: express.Request, res: express.Response) => {
    try {
      const id = req.params.id;
      const employee: IEmployee = req.body;
      res.status(200).json(await model.editEmployee(id, employee));
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
