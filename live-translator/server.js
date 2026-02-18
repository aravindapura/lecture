import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/translate", async (req, res) => {
  try {
    const { text, direction } = req.body ?? {};

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Field 'text' is required and must be a string." });
    }

    if (!["ru-en", "en-ru"].includes(direction)) {
      return res.status(400).json({ error: "Field 'direction' must be 'ru-en' or 'en-ru'." });
    }

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes("ВСТАВЬ_СВОЙ_КЛЮЧ_СЮДА")) {
      return res.status(500).json({
        error: "OPENAI_API_KEY is not configured. Put your key into .env file.",
      });
    }

    const instruction =
      direction === "ru-en"
        ? "If direction is ru-en → translate to English. Return only translated text."
        : "If direction is en-ru → translate to Russian. Return only translated text.";

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a translation assistant. Follow instruction exactly and return only translated text with no explanations.",
        },
        {
          role: "user",
          content: `${instruction}\n\nText: ${text}`,
        },
      ],
      temperature: 0,
    });

    const translatedText = response.choices?.[0]?.message?.content?.trim() || "";

    return res.json({ translatedText });
  } catch (error) {
    console.error("Translation error:", error);
    return res.status(500).json({ error: "Failed to translate text." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
