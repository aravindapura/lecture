const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const directionSelect = document.getElementById("direction");
const translationEl = document.getElementById("translatedText");
const sourceEl = document.getElementById("sourceText");
const statusEl = document.getElementById("status");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  statusEl.textContent = "Status: Web Speech API is not supported in this browser. Use Google Chrome.";
  startBtn.disabled = true;
  throw new Error("Web Speech API is not available");
}

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "ru-RU";

let listening = false;
let lastFinalTranscript = "";
const translatedChunks = [];
const sourceChunks = [];
let queue = Promise.resolve();

function updateRecognitionLanguage() {
  recognition.lang = directionSelect.value === "ru-en" ? "ru-RU" : "en-US";
}

async function translateText(text, direction) {
  const response = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, direction }),
  });

  let payload = {};
  try {
    payload = await response.json();
  } catch {
    payload = {};
  }

  if (!response.ok) {
    throw new Error(payload.error || `Translation failed (${response.status})`);
  }

  return payload.translated || "";
}

function handleFinalText(transcript) {
  if (!transcript || transcript === lastFinalTranscript) {
    return;
  }

  lastFinalTranscript = transcript;
  sourceChunks.push(transcript);
  sourceEl.textContent = sourceChunks.join(" ");

  queue = queue
    .then(async () => {
      const translated = await translateText(transcript, directionSelect.value);
      if (translated) {
        translatedChunks.push(translated);
        translationEl.textContent = translatedChunks.join(" ");
      }
    })
    .catch((error) => {
      statusEl.textContent = `Status: error - ${error.message}`;
      console.error("Translate queue error:", error);
    });
}

startBtn.addEventListener("click", () => {
  if (listening) return;

  updateRecognitionLanguage();
  recognition.start();
  listening = true;
  statusEl.textContent = "Status: listening...";
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener("click", () => {
  if (!listening) return;

  listening = false;
  recognition.stop();
  statusEl.textContent = "Status: stopped";
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

directionSelect.addEventListener("change", updateRecognitionLanguage);

recognition.onresult = (event) => {
  let interim = "";

  for (let i = event.resultIndex; i < event.results.length; i += 1) {
    const result = event.results[i];
    const text = result[0].transcript.trim();

    if (!text) continue;

    if (result.isFinal) {
      handleFinalText(text);
    } else {
      interim += `${text} `;
    }
  }

  const interimText = interim.trim();
  sourceEl.textContent = interimText
    ? `${sourceChunks.join(" ")} ${interimText}`.trim()
    : sourceChunks.join(" ");
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
