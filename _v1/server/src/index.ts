import { Request, Response } from "express";
import express from "express";
const app = express();
const port = process.env.PORT || 9000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello !");
});

app.listen(port);
