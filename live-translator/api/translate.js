import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { text, direction } = req.body ?? {};

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Field 'text' is required and must be a string." });
    }

    if (!["ru-en", "en-ru"].includes(direction)) {
      return res.status(400).json({ error: "Field 'direction' must be 'ru-en' or 'en-ru'." });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "OPENAI_API_KEY is not configured in Vercel environment variables.",
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const instruction =
      direction === "ru-en"
        ? "If direction is ru-en → translate to English"
        : "If direction is en-ru → translate to Russian";

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a translation assistant. Return only translated text, no comments, no explanations.",
        },
        {
          role: "user",
          content: `${instruction}. Return only translated text.\n\nText: ${text}`,
        },
      ],
      temperature: 0,
    });

    const translatedText = response.choices?.[0]?.message?.content?.trim() || "";

    return res.status(200).json({ translatedText });
  } catch (error) {
    console.error("Translation error:", error);
    const providerMessage = error?.error?.message || error?.message || "Failed to translate text.";
    return res.status(500).json({ error: providerMessage });
  }
}
