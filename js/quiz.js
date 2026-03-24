const questions = [
  // ── ELEKTRO OG DATATEKNOLOGI ──
  {
    question: "Hva måles i Ohm (Ω)?",
    answers: ["Strøm", "Motstand", "Spenning", "Effekt"],
    correct: 1,
  },
  {
    question: "Hva gjør en sikring?",
    answers: [
      "Øker spenningen",
      "Lagrer strøm",
      "Stopper strømmen hvis den blir for høy",
      "Produserer strøm",
    ],
    correct: 2,
  },

  // ── HELSE OG OPPVEKST ──
  {
    question: "Hva er normal kroppstemperatur?",
    answers: ["37°C", "35°C", "39°C", "40°C"],
    correct: 0,
  },
  {
    question: "Hva betyr empati?",
    answers: [
      "Bestemme over andre",
      "Forstå hvordan andre føler det",
      "Gi medisiner",
      "Skrive rapport",
    ],
    correct: 1,
  },

  // ── IDRETTSFAG ──
  {
    question: "Hva er kroppens viktigste energikilde under hard trening?",
    answers: ["Protein", "Karbohydrater", "Vann", "Vitaminer"],
    correct: 1,
  },
  {
    question: "Hva er Fair Play?",
    answers: [
      "Å vinne for enhver pris",
      "Å følge regler og vise respekt",
      "Å spille alene",
      "Å jukse",
    ],
    correct: 1,
  },

  // ── IT ──
  {
    question: "Hva betyr HTML?",
    answers: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyper Tool Multi Language",
      "Home Tool Markup Language",
    ],
    correct: 0,
  },
  {
    question: "Hva gjør CSS?",
    answers: [
      "Lager databaser",
      "Bestemmer utseendet på nettsider",
      "Lagrer data",
      "Lager servere",
    ],
    correct: 1,
  },

  // ── IKT (MED VIDEO) ──
  {
    question:
      "Hva er den riktige måten å koble seg på nettet den førstegangen?",
    video: "../vidio/Sequence 01.mp4", 
    answers: ["FRID", "FRID-iot", "FRID-gjest", "mobil data"],
    correct: 1,
  },

  // ── SSR ──
  {
    question: "Hva er god kundeservice?",
    answers: [
      "Ignorere kunder",
      "Hjelpe kunder på en vennlig måte",
      "Snakke minst mulig",
      "Bare selge",
    ],
    correct: 1,
  },

  // ── KANTINA ──
  {
    question: "Hva gjør du vanligvis i kantina?",
    answers: ["Sover", "Spiser og sosialiserer", "Har eksamen", "Programmerer"],
    correct: 1,
  },

  // ── SAMFUNN ──
  {
    question: "Hva betyr demokrati?",
    answers: [
      "En person bestemmer alt",
      "Folket har makt",
      "Ingen bestemmer",
      "Kun lærere bestemmer",
    ],
    correct: 1,
  },

  // ── MEDBORGERSKAP ──
  {
    question: "Hva bør du gjøre hvis noen blir mobbet?",
    answers: ["Ignorere det", "Filme det", "Si ifra til en voksen", "Le"],
    correct: 2,
  },
];

// ── STATE ── //
let currentIndex = 0;
let score = 0;
let answered = false;

// ── ELEMENTS ── //
const qText = document.getElementById("q-text");
const qAnswers = document.getElementById("q-answers");
const qCounter = document.getElementById("q-counter");
const qFeedback = document.getElementById("q-feedback");
const qCurrent = document.getElementById("q-current");
const qTotal = document.getElementById("q-total");
const qScore = document.getElementById("q-score");
const progressFill = document.getElementById("progress-fill");
const btnNext = document.getElementById("btn-next");
const quizCard = document.getElementById("quiz-card");
const resultCard = document.getElementById("result-card");
const resultScore = document.getElementById("result-score");
const resultMsg = document.getElementById("result-msg");
const btnRestart = document.getElementById("btn-restart");

//  VIDEO
const qVideo = document.getElementById("q-video");
const videoSource = document.getElementById("video-source");

// ── INIT ── //
function init() {
  qTotal.textContent = questions.length;
  loadQuestion();
}

// ── LOAD QUESTION ── //
function loadQuestion() {
  const q = questions[currentIndex];
  answered = false;

  qCounter.textContent = `Spørsmål ${currentIndex + 1} av ${questions.length}`;
  qCurrent.textContent = currentIndex + 1;

  progressFill.style.width = `${(currentIndex / questions.length) * 100}%`;

  qText.textContent = q.question;

  // VIDEO LOGIC
  if (q.video) {
    qVideo.style.display = "block";
    videoSource.src = q.video;
    qVideo.load();
  } else {
    qVideo.style.display = "none";
    qVideo.pause();
  }

  qAnswers.innerHTML = "";
  qFeedback.textContent = "";
  btnNext.style.display = "none";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.classList.add("answer-btn");
    btn.textContent = answer;
    btn.addEventListener("click", () => selectAnswer(index));
    qAnswers.appendChild(btn);
  });
}

// ── SELECT ANSWER ── //
function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const buttons = qAnswers.querySelectorAll(".answer-btn");

  // pause video when answering
  qVideo.pause();

  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === q.correct) btn.classList.add("correct");
    else if (index === selectedIndex) btn.classList.add("wrong");
  });

  if (selectedIndex === q.correct) {
    score++;
    qScore.textContent = score;
    qFeedback.textContent = "✓ Riktig!";
  } else {
    qFeedback.textContent = `✗ Feil — riktig svar: ${q.answers[q.correct]}`;
  }

  btnNext.style.display = "inline-block";
}

// ── NEXT QUESTION ── //
btnNext.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// ── SHOW RESULT ── //
function showResult() {
  quizCard.style.display = "none";
  resultCard.style.display = "block";

  progressFill.style.width = "100%";

  resultScore.textContent = `${score}/${questions.length}`;

  const percent = score / questions.length;
  if (percent === 1)
    resultMsg.textContent = "Perfekt! Du kan Bleiker ut og inn.";
  else if (percent >= 0.7)
    resultMsg.textContent = "Bra jobbet — du kjenner Bleiker godt!";
  else if (percent >= 0.4)
    resultMsg.textContent = "Ikke verst, men det er rom for forbedring.";
  else resultMsg.textContent = "Kanskje bruk litt mer tid i gangene...";
}

// ── RESTART ── //
btnRestart.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  answered = false;
  qScore.textContent = 0;

  resultCard.style.display = "none";
  quizCard.style.display = "block";

  loadQuestion();
});

// ── START ── //
init();
