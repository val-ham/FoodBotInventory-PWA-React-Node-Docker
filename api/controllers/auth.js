import { query } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const checkExisting = "SELECT * FROM users WHERE username = ?";
    const [[existingUser]] = await query(checkExisting, [req.body.username]);
    if (existingUser)
      return res
        .status(409)
        .json("Account already exists with the given username!");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const createAccount =
      "INSERT INTO users(`username`, `password`) VALUES (?)";
    await query(createAccount, [[req.body.username, hash]]);
    return res.status(200).json("Account created!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  console.log("in login function");
  try {
    const selectUser = "SELECT * FROM users WHERE username = ?";
    const [[user]] = await query(selectUser, [req.body.username]);
    if (!user) return res.status(404).json("User not found!");
    if (!bcrypt.compare(req.body.password, user.password))
      return res.status(400).json("Wrong username or password");
    const token = jwt.sign({ id: user.id, username: user.username }, "jwtkey");
    const { username } = user;
    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(username);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const logout = (req, res) => {
  return res
    .cookie("access_token", "", {
      httpOnly: true,
      expires: new Date(0),
      httpOnly: true,
    })
    .status(200)
    .json("logout");
};
