import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

export const openaiApiConfig = (req, res, next) => {
  if (process.env.NODE_ENV !== "production") dotenv.config();
  try {
    const configuration = new Configuration({
      organization: process.env.OPENAI_ORGANIZATION,
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);
    req.openai = openai;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};
