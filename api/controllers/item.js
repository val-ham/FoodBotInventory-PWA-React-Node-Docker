import { query } from "../db.js";

export const getItems = async (req, res) => {
  try {
    const q =
      " SELECT items.*, user_items.quantity, user_items.id FROM items JOIN user_items ON items.ean = user_items.item_ean WHERE user_items.user_id = ?";
    const [items] = await query(q, [req.userId]);
    return res.status(200).json(items);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getItemById = async (req, res) => {
  try {
    const q =
      "SELECT items.*, user_items.quantity, user_items.id FROM items JOIN user_items ON items.ean = user_items.item_ean WHERE user_items.user_id = ? AND user_items.id = ?";
    const [item] = await query(q, [req.userId, req.params.id]);

    if (item.length > 0) {
      return res.status(200).json(item[0]);
    } else {
      return res.status(404).json("Item not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addItems = async (req, res) => {
  try {
    const items = req.body.items;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json("Invalid items array.");
    }
    const values = items.map((item) => [req.userId, item.ean, item.quantity]);
    const placeholders = items.map(() => "(?, ?, ?)").join(", ");
    const q = `INSERT INTO user_items (user_id, item_ean, quantity) VALUES ${placeholders} ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`;
    await query(q, values.flat());
    return res.json("Items added!");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteItem = async (req, res) => {
  try {
    const q = "DELETE FROM user_items WHERE `id` = ? AND `user_id` = ?";
    await query(q, [req.body.id, req.userId]);
    return res.status(200).json("item deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const decreseQuantity = async (req, res) => {
  try {
    await query("CALL decrease_quantity(?,?)", [
      req.body.id,
      req.body.quantity,
    ]);
    return res.status(200).json("item updated");
  } catch (error) {
    res.status(500).json(error);
  }
};
