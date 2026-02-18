const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const directionSelect = document.getElementById("direction");
const sourceTextEl = document.getElementById("sourceText");
const translatedTextEl = document.getElementById("translatedText");
const statusEl = document.getElementById("status");

if (!("webkitSpeechRecognition" in window)) {
  statusEl.textContent = "Status: Web Speech API is not supported in this browser. Use Google Chrome.";
  startBtn.disabled = true;
  throw new Error("webkitSpeechRecognition is not available.");
}

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "ru-RU";

let listening = false;
let finalizedSourceChunks = [];
let finalizedTranslationChunks = [];
let lastSubmittedText = "";
let requestQueue = Promise.resolve();

function updateLanguageByDirection() {
  recognition.lang = directionSelect.value === "ru-en" ? "ru-RU" : "en-US";
}

async function translateText(text, direction) {
  const response = await fetch("/api/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, direction }),
  });

  let data = {};
  let rawText = "";

  try {
    data = await response.json();
  } catch {
    rawText = await response.text().catch(() => "");
  }

  if (!response.ok) {
    throw new Error(
      data.error || rawText.slice(0, 180) || `Translation request failed (${response.status}).`,
    );
  }

  return data.translatedText || "";
}

function appendFinalSegment(transcript) {
  if (!transcript || transcript === lastSubmittedText) {
    return;
  }

  lastSubmittedText = transcript;
  finalizedSourceChunks.push(transcript);
  sourceTextEl.textContent = finalizedSourceChunks.join(" ");

  requestQueue = requestQueue
    .then(async () => {
      const translated = await translateText(transcript, directionSelect.value);
      if (translated) {
        finalizedTranslationChunks.push(translated);
        translatedTextEl.textContent = finalizedTranslationChunks.join(" ");
      }
    })
    .catch((error) => {
      statusEl.textContent = `Status: error - ${error.message}`;
      console.error("Translation queue error:", error);
    });
}

startBtn.addEventListener("click", () => {
  if (listening) return;

  updateLanguageByDirection();
  recognition.start();
  listening = true;
  statusEl.textContent = "Status: listening...";
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener("click", () => {
  if (!listening) return;

  recognition.stop();
  listening = false;
  statusEl.textContent = "Status: stopped";
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

directionSelect.addEventListener("change", updateLanguageByDirection);

recognition.onresult = (event) => {
  let interimTranscript = "";

  for (let i = event.resultIndex; i < event.results.length; i += 1) {
    const result = event.results[i];
    const transcript = result[0].transcript.trim();

    if (!transcript) continue;

    if (result.isFinal) {
      appendFinalSegment(transcript);
    } else {
      interimTranscript += `${transcript} `;
    }
  }

  const interim = interimTranscript.trim();
  if (interim) {
    sourceTextEl.textContent = `${finalizedSourceChunks.join(" ")} ${interim}`.trim();
  } else {
    sourceTextEl.textContent = finalizedSourceChunks.join(" ");
  }
};

recognition.onerror = (event) => {
  statusEl.textContent = `Status: recognition error - ${event.error}`;
};

recognition.onend = () => {
  if (listening) {
    recognition.start();
    return;
  }

  startBtn.disabled = false;
  stopBtn.disabled = true;
};
