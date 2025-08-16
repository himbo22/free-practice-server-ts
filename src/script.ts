import App from "@himbo22/expresskpop";
import { drizzle } from "drizzle-orm/node-postgres";
import * as fs from "fs";
import * as ejs from "ejs";
import { Feedback } from "./drizzle/schema";

const app = new App();
const db = drizzle("postgres://postgres:hoanglon@localhost:5432/8_7_2025");

interface Item {
  email: string;
  content: string;
}

const items: Item[] = [
  { email: "alice@example.com", content: "Hello, world!" },
  { email: "bob@example.com", content: "This is a test" },
  { email: "carol@example.com", content: "Nice landing page" },
];

app.get("/public/style.css", (req, res) => {
  const css = fs.readFileSync("./src/public/style.css", "utf8");
  res.setHeader("Content-Type", "text/css");
  res.end(css);
});

app.get("/", async (req, res) => {
  const template = fs.readFileSync("./src/views/index.ejs", "utf8");
  const items = await db.select().from(Feedback);
  console.log(items);

  const html = ejs.render(template, { items });
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
});

app.get("/contact", (req, res) => {
  const template = fs.readFileSync("./src/views/contact.ejs", "utf8");
  const html = ejs.render(template, { items });
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
});

app.post("/api/contact", async (req, res) => {
  const { email, content } = req.body;
  console.log(email, content);
  if (email && content) {
    const result = await db
      .insert(Feedback)
      .values({ email, content })
      .returning();
    res.status(200).json({ status: result[0] });
  } else {
    res.status(400).json({ status: "not ok" });
  }
});

app.run(3000);
