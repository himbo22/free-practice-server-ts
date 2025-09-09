const express = require("express");
const app = express();
const port = 3036;

app.get("/", (req, res) => {
  res.send("Hello Minju, I love you");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
