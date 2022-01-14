import { Request, Response } from "express";
import express from "express";
const app = express();
const port = process.env.PORT || 9000;





app.get("/", (_req: Request, res: Response) => {
  res.send("Hello ! and the sum of one and two is ");
});

app.listen(port);
