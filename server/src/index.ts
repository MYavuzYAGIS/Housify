import { Request, Response } from "express";
import express from "express";
const app = express();
const port = process.env.PORT || 9000;

const one=1;
const two=2;



app.get("/", (req: Request, res: Response) => {
  res.send("Hello ! and the sum of one and two is "+(one+two));
});

app.listen(port);
