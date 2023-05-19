import jwt from "jsonwebtoken";

export const authJWT = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const jwtPayload = jwt.verify(token, "jwtkey");
    req.userId = jwtPayload.id;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json("Token is not valid!");
    }
    res.status(500).json(error);
  }
};
