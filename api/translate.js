import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { text, direction } = req.body ?? {};

    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ error: "Field 'text' is required and must be a non-empty string." });
    }

    if (direction !== "ru-en" && direction !== "en-ru") {
      return res.status(400).json({ error: "Field 'direction' must be 'ru-en' or 'en-ru'." });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OPENAI_API_KEY is not configured." });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const targetLanguage = direction === "ru-en" ? "English" : "Russian";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      messages: [
        {
          role: "system",
          content: "You are a translator. Return only the translated text.",
        },
        {
          role: "user",
          content: `Translate this text to ${targetLanguage}. Return only translation.\n\n${text}`,
        },
      ],
    });

    const translated = completion.choices?.[0]?.message?.content?.trim() ?? "";

    return res.status(200).json({ translated });
  } catch (error) {
    console.error("Translation error:", error);
    const message = error?.error?.message || error?.message || "Failed to translate.";
    return res.status(500).json({ error: message });
  }
}
