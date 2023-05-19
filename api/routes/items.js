import express from "express";
import {
  getItems,
  addItems,
  deleteItem,
  decreseQuantity,
  getItemById,
} from "../controllers/item.js";
import { authJWT } from "../middleware/authJWT.js";

const router = express.Router();

router.get("/", authJWT, getItems);
router.get("/:id", authJWT, getItemById);
router.post("/add", authJWT, addItems);
router.post("/delete", authJWT, deleteItem);
router.post("/decrease", authJWT, decreseQuantity);

export default router;
