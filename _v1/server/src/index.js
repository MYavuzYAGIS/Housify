const express = require("express");
const app = express();
const port = process.env.PORT || 9000;

app.get("/", (_, res) => {
  res.send("Hello World");
});

app.listen(port);
