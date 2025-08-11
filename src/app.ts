import App from "./index";
import { sum, sub, div, mul } from "@himbo22/sum";
import { drizzle } from "drizzle-orm/postgres-js";

const app = new App();

const db = drizzle(process.env.DATABASE_URL);

// const result = await db.execute("select 1");

interface ApiResponse<T> {
  payload?: T;
  success: boolean;
  message: string;
  errorCode?: string;
}

app.post("/sum", (req, res) => {
  const numbers = req.body;
  try {
    const result = sum(...numbers);
    const response: ApiResponse<number> = {
      payload: result,
      success: true,
      message: "alright",
      errorCode: null,
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<number> = {
      payload: null,
      success: true,
      message: "alright",
      errorCode: "ERROR",
    };
    res.json(response);
  }
});

app.post("/sub", (req, res) => {
  const numbers = req.body;
  try {
    const result = sub(...numbers);
    const response: ApiResponse<number> = {
      payload: result,
      success: true,
      message: "alright",
      errorCode: null,
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<number> = {
      payload: null,
      success: true,
      message: "alright",
      errorCode: "ERROR",
    };
    res.json(response);
  }
});

app.post("/mul", (req, res) => {
  const numbers = req.body;
  try {
    const result = mul(...numbers);
    const response: ApiResponse<number> = {
      payload: result,
      success: true,
      message: "alright",
      errorCode: null,
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<number> = {
      payload: null,
      success: true,
      message: "alright",
      errorCode: "ERROR",
    };
    res.json(response);
  }
});

app.post("/div", (req, res) => {
  const numbers = req.body;
  try {
    const result = div(...numbers);
    const response: ApiResponse<number> = {
      payload: result,
      success: true,
      message: "alright",
      errorCode: null,
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<number> = {
      payload: null,
      success: true,
      message: "alright",
      errorCode: "ERROR",
    };
    res.json(response);
  }
});

app.get("/test", (req, res) => {
  const query = (req as any).query;
  console.log(query);

  try {
    if (query.success == 1) {
      const response: ApiResponse<string> = {
        payload: "ok",
        success: true,
        message: "alright",
        errorCode: null,
      };
      res.json(response);
    } else {
      const response: ApiResponse<string> = {
        payload: null,
        success: false,
        message: "not ok",
        errorCode: "1001",
      };
      res.json(response);
    }
  } catch (e) {
    console.log("no query string");
  }
});

app.post("/test", (req, res) => {
  console.log("oh ye");
  res.status(200).send("oh yes");
});

const start = async () => {
  app.run(3000);
};

start();
