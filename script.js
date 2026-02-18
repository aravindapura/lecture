const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const directionSelect = document.getElementById("direction");
const sourceElement = document.getElementById("sourceText");
const translationElement = document.getElementById("translatedText");
const statusElement = document.getElementById("status");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  statusElement.textContent = "Status: Web Speech API is not supported in this browser. Use Google Chrome.";
  startBtn.disabled = true;
  throw new Error("Web Speech API is not available");
}

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "ru-RU";

let listening = false;
const processedFinalSignatures = new Set();

function updateRecognitionLanguage() {
  recognition.lang = directionSelect.value === "ru-en" ? "ru-RU" : "en-US";
}

async function sendForTranslation(recognizedText, selectedDirection) {
  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: recognizedText,
        direction: selectedDirection,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Translation request failed (${response.status})`);
    }

    const data = await response.json();

    if (data.translated) {
      translationElement.textContent += `${data.translated} `;
    }
  } catch (error) {
    statusElement.textContent = `Status: translation error - ${error.message}`;
    console.error("Translation error:", error);
  }
}

startBtn.addEventListener("click", () => {
  if (listening) return;

  updateRecognitionLanguage();
  recognition.start();
  listening = true;
  statusElement.textContent = "Status: listening...";
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener("click", () => {
  if (!listening) return;

  listening = false;
  recognition.stop();
  statusElement.textContent = "Status: stopped";
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

directionSelect.addEventListener("change", updateRecognitionLanguage);

recognition.onresult = (event) => {
  let interimTranscript = "";

  for (let i = event.resultIndex; i < event.results.length; i += 1) {
    const result = event.results[i];
    const recognizedText = result[0].transcript.trim();

    if (!recognizedText) continue;

    if (result.isFinal) {
      const signature = `${i}:${recognizedText}`;
      if (processedFinalSignatures.has(signature)) {
        continue;
      }

      processedFinalSignatures.add(signature);

      sourceElement.textContent += `${recognizedText} `;
      sendForTranslation(recognizedText, directionSelect.value);
    } else {
      interimTranscript += `${recognizedText} `;
    }
  }

  if (interimTranscript) {
    statusElement.textContent = "Status: listening...";
  }
};

recognition.onerror = (event) => {
  statusElement.textContent = `Status: recognition error - ${event.error}`;
  console.error("Recognition error:", event.error);
};

recognition.onend = () => {
  if (listening) {
    recognition.start();
    return;
  }

  startBtn.disabled = false;
  stopBtn.disabled = true;
};
