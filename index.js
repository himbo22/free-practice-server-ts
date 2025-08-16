import { createServer } from "node:http";
import fs from "node:fs";
import ejs from "ejs";

const data = [
  {
    id: 1,
    message: "Hello, World!",
  },
  {
    id: 2,
    message: "Hello, Universe!",
  },
];

const server = createServer((req, res) => {
  const content = fs.readFileSync("./index.html", "utf8");

  let table = "<table>";
  data.forEach((item) => {
    table += `<tr><td>${item.id}</td><td>${item.message}</td></tr>`;
  });
  table += "</table>";
  const newContent = content.replace("{{ ohye }}", table);

  console.log(content.includes("ohye"));
  res.end(newContent);
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
