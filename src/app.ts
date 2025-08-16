import { eq } from "drizzle-orm";
import App from "./index";
import { sum, sub, div, mul } from "@himbo22/sum";
import { drizzle } from "drizzle-orm/node-postgres";
import { User } from "./drizzle/schema";

interface ApiResponse<T> {
  payload?: T;
  success: boolean;
  message: string;
  errorCode?: string | null;
}

const createApp = () => {
  const app = new App();
  const db = drizzle("postgres://postgres:hoanglon@localhost:5432/8_7_2025");

  const mathOperation = (operation: (...args: number[]) => number) => {
    return (req, res) => {
      const numbers = req.body;
      try {
        const result = operation(...numbers);
        res.json({
          payload: result,
          success: true,
          message: "alright",
          errorCode: null,
        });
      } catch (error) {
        res.json({
          payload: null,
          success: false,
          message: "Operation failed",
          errorCode: "ERROR",
        });
      }
    };
  };

  const getAllUsers = async (req, res) => {
    const users = await db.select().from(User);
    const response: ApiResponse<any[]> = {
      payload: users,
      success: true,
      message: "alright",
      errorCode: null,
    };
    res.json(response);
  };

  const getUserById = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
        errorCode: "INVALID_ID",
      });
    }

    const user = await db.select().from(User).where(eq(User.id, id));

    if (user.length > 0) {
      res.json({
        payload: user[0],
        success: true,
        message: "alright",
        errorCode: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
        errorCode: "NOT_FOUND",
      });
    }
  };

  const createUser = async (req, res) => {
    try {
      const { name, email } = req.body;
      const result = await db.insert(User).values({ name, email }).returning();
      res.json({
        payload: result[0],
        success: true,
        message: "User created successfully",
        errorCode: null,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Failed to create user",
        errorCode: "CREATE_ERROR",
      });
    }
  };

  const updateUser = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid ID",
          errorCode: "INVALID_ID",
        });
      }

      const { name, email } = req.body;
      const result = await db
        .update(User)
        .set({ name, email })
        .where(eq(User.id, id))
        .returning();

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
          errorCode: "NOT_FOUND",
        });
      }

      res.json({
        payload: result[0],
        success: true,
        message: "User updated successfully",
        errorCode: null,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Failed to update user",
        errorCode: "UPDATE_ERROR",
      });
    }
  };

  const patchUser = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid ID",
          errorCode: "INVALID_ID",
        });
      }

      const updates = req.body;
      const result = await db
        .update(User)
        .set(updates)
        .where(eq(User.id, id))
        .returning();

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
          errorCode: "NOT_FOUND",
        });
      }

      res.json({
        payload: result[0],
        success: true,
        message: "User patched successfully",
        errorCode: null,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Failed to patch user",
        errorCode: "PATCH_ERROR",
      });
    }
  };

  const deleteUser = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid ID",
          errorCode: "INVALID_ID",
        });
      }

      const result = await db.delete(User).where(eq(User.id, id)).returning();

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
          errorCode: "NOT_FOUND",
        });
      }

      res.json({
        payload: result[0],
        success: true,
        message: "User deleted successfully",
        errorCode: null,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Failed to delete user",
        errorCode: "DELETE_ERROR",
      });
    }
  };

  const testGet = (req, res) => {
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
  };

  const testPost = (req, res) => {
    console.log("oh ye");
    res.status(200).send("oh yes");
  };

  // Initialize routes
  app.get("/users", getAllUsers);
  app.get("/users/:id", getUserById);
  app.post("/users", createUser);
  app.put("/users/:id", updateUser);
  app.patch("/users/:id", patchUser);
  app.del("/users/:id", deleteUser);

  app.post("/sum", mathOperation(sum));
  app.post("/sub", mathOperation(sub));
  app.post("/mul", mathOperation(mul));
  app.post("/div", mathOperation(div));

  app.get("/test", testGet);
  app.post("/test", testPost);

  return {
    start: (port: number = 3000) => app.run(port),
  };
};

const application = createApp();
export default application;
