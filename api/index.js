import express from "express";
import authRoutes from "./routes/auth.js";
import itemRoutes from "./routes/items.js";
import botRoutes from "./routes/bot.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { init } from "./db.js";

const app = express();
const port = process.env.PORT || 8800;

app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use("/", authRoutes);
app.use("/items", itemRoutes);
app.use("/bot", botRoutes);

init().then(() => {
  app.listen(port, "0.0.0.0", () => {
    console.log(`listening on port ${port}`);
  });
});
