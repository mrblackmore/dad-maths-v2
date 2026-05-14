// Dad Maths V2 app logic.
// Topic and question content is loaded first from questions.js.
// Keep this file focused on screens, feedback and progression.

// Save commonly used page elements once, so functions below stay readable.
const screens = {
  home: document.getElementById("homeScreen"),
  lesson: document.getElementById("lessonScreen"),
  question: document.getElementById("questionScreen"),
  celebration: document.getElementById("celebrationScreen"),
  certificate: document.getElementById("certificateScreen")
};

const topicGrid = document.getElementById("topicGrid");
const startLearningButton = document.getElementById("startLearningButton");
const startBronzeButton = document.getElementById("startBronzeButton");
const checkAnswerButton = document.getElementById("checkAnswerButton");
const finishTopicButton = document.getElementById("finishTopicButton");
const viewCertificateButton = document.getElementById("viewCertificateButton");
const downloadCertificateButton = document.getElementById("downloadCertificateButton");
const printCertificateButton = document.getElementById("printCertificateButton");
const answerInput = document.getElementById("answerInput");
const feedbackBox = document.getElementById("feedbackBox");

const appState = {
  selectedTopic: dadMathsTopics[0],
  currentLevel: "bronze",
  currentQuestionIndex: 0,
  attempts: 0,
  completedLevels: [],
  isMovingToNextQuestion: false,
  completedTopic: null,
  learnerName: "Lauren"
};

const levelOrder = ["bronze", "silver", "gold"];
const successMessages = [
  "Nice one Lauren!",
  "Great work!",
  "You are levelling up!",
  "That was a confident answer!"
];

function showScreen(screenName) {
  Object.values(screens).forEach((screen) => screen.classList.add("hidden"));
  screens[screenName].classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderTopics() {
  topicGrid.innerHTML = "";

  dadMathsTopics.forEach((topic) => {
    const topicButton = document.createElement("button");
    topicButton.className = "topic-card";
    topicButton.style.setProperty("--topic-accent", topic.accent || "#3498db");
    topicButton.disabled = !topic.isReady;
    topicButton.innerHTML = `
      <img class="topic-thumb" src="${topic.imagePath}" alt="" />
      <span>
        <h3>${topic.name}</h3>
        <p>${topic.isReady ? `${topic.progress}% complete` : "Coming soon"}</p>
      </span>
      <span class="mini-progress" aria-hidden="true"><span style="width: ${topic.progress}%"></span></span>
    `;

    topicButton.addEventListener("click", () => {
      appState.selectedTopic = topic;
      renderLesson(topic);
      showScreen("lesson");
    });

    topicGrid.appendChild(topicButton);
  });
}

function renderLesson(topic) {
  setThemeAccent(topic);
  document.getElementById("lessonIcon").textContent = topic.icon;
  document.getElementById("lessonTopic").textContent = topic.name;
  document.getElementById("lessonTitle").textContent = topic.lesson.title;
  document.getElementById("lessonText").textContent = topic.lesson.text;
  document.getElementById("workedExample").textContent = topic.lesson.example;
  document.getElementById("lessonImage").src = topic.imagePath;
  document.getElementById("lessonImage").alt = `${topic.name} lesson sheet`;
}

function startLevel(level) {
  setThemeAccent(appState.selectedTopic);
  appState.currentLevel = level;
  appState.currentQuestionIndex = 0;
  appState.attempts = 0;
  renderQuestion();
  showScreen("question");
}

function getCurrentLevelQuestions() {
  return appState.selectedTopic.questions.filter((question) => question.level === appState.currentLevel);
}

function getCurrentQuestion() {
  return getCurrentLevelQuestions()[appState.currentQuestionIndex];
}

function renderQuestion() {
  const levelQuestions = getCurrentLevelQuestions();
  const question = getCurrentQuestion();
  const questionNumber = appState.currentQuestionIndex + 1;
  const progressPercent = (appState.currentQuestionIndex / levelQuestions.length) * 100;
  const levelBadge = document.getElementById("levelBadge");
  const questionCard = document.getElementById("questionCard");

  levelBadge.textContent = capitalise(appState.currentLevel);
  levelBadge.className = `level-badge ${appState.currentLevel}`;
  document.getElementById("progressLabel").textContent = `Question ${questionNumber} of ${levelQuestions.length}`;
  document.getElementById("progressFill").style.width = `${progressPercent}%`;
  document.getElementById("questionText").textContent = question.question;
  document.getElementById("questionText").classList.toggle("question-wordy", question.question.length > 42);

  answerInput.value = "";
  checkAnswerButton.disabled = false;
  appState.isMovingToNextQuestion = false;
  feedbackBox.textContent = "";
  feedbackBox.className = "feedback-box";
  questionCard.classList.remove("is-changing");
  void questionCard.offsetWidth;
  questionCard.classList.add("is-changing");
  answerInput.focus();
}

function checkAnswer() {
  if (appState.isMovingToNextQuestion) {
    return;
  }

  const question = getCurrentQuestion();
  const userAnswer = normaliseAnswer(answerInput.value);
  const correctAnswer = normaliseAnswer(question.answer);

  if (userAnswer === "") {
    showFeedback("Pop an answer in when you are ready.", "try-again");
    return;
  }

  if (Number(userAnswer) === Number(correctAnswer)) {
    const message = successMessages[Math.floor(Math.random() * successMessages.length)];
    appState.isMovingToNextQuestion = true;
    checkAnswerButton.disabled = true;
    showFeedback(`${message} ${question.explanation}`, "correct");
    setTimeout(moveToNextQuestion, 1150);
    return;
  }

  appState.attempts += 1;
  if (appState.attempts >= 2) {
    showFeedback(`Good try. Hint: ${question.hint}`, "try-again");
  } else {
    showFeedback("Nearly there. Have another calm go.", "try-again");
  }
}

function moveToNextQuestion() {
  const levelQuestions = getCurrentLevelQuestions();
  appState.currentQuestionIndex += 1;
  appState.attempts = 0;

  if (appState.currentQuestionIndex < levelQuestions.length) {
    renderQuestion();
    return;
  }

  completeCurrentLevel();
}

function completeCurrentLevel() {
  const completedLevel = appState.currentLevel;
  const nextLevel = levelOrder[levelOrder.indexOf(completedLevel) + 1];
  appState.completedLevels.push(completedLevel);
  updateTopicProgress();

  if (nextLevel) {
    showFeedback(`${capitalise(completedLevel)} completed. ${capitalise(nextLevel)} unlocked!`, "correct");
    setTimeout(() => startLevel(nextLevel), 1200);
    return;
  }

  document.getElementById("progressFill").style.width = "100%";
  appState.completedTopic = appState.selectedTopic;
  renderCertificate();
  document.getElementById("celebrationMessage").textContent =
    "Brilliant work, Lauren. You finished Bronze, Silver and Gold with real persistence.";
  showScreen("celebration");
}

function updateTopicProgress() {
  const levelProgress = {
    bronze: 34,
    silver: 67,
    gold: 100
  };
  const latestLevel = appState.completedLevels[appState.completedLevels.length - 1];
  appState.selectedTopic.progress = levelProgress[latestLevel] || 0;
  renderTopics();
}

function showFeedback(message, type) {
  feedbackBox.textContent = message;
  feedbackBox.className = `feedback-box ${type}`;
}

function setThemeAccent(topic) {
  document.documentElement.style.setProperty("--accent", topic.accent || "#3498db");
}

function renderCertificate() {
  const topic = appState.completedTopic || appState.selectedTopic;
  const today = new Date();

  document.getElementById("certificateName").textContent = appState.learnerName;
  document.getElementById("certificateTopic").textContent = topic.name;
  document.getElementById("certificateDate").textContent = today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function showCertificate() {
  renderCertificate();
  showScreen("certificate");
}

function downloadCertificate() {
  const topic = appState.completedTopic || appState.selectedTopic;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const width = 1600;
  const height = 1120;
  const logo = new Image();

  canvas.width = width;
  canvas.height = height;

  logo.onload = () => {
    drawCertificateCanvas(context, logo, topic, width, height);

    const link = document.createElement("a");
    link.download = `dad-maths-${topic.id}-gold-certificate.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  logo.src = "assets/dad-maths-logo.png";
}

function drawCertificateCanvas(context, logo, topic, width, height) {
  const certificateDate = document.getElementById("certificateDate").textContent;

  context.fillStyle = "#6c2eb9";
  context.fillRect(0, 0, width, height);

  roundedRect(context, 24, 24, width - 48, height - 48, 34, "#ffffff", "#8f54d2", 4);
  drawSoftMathMarks(context, width, height);
  context.drawImage(logo, 70, 50, 320, 320);

  roundedRect(context, 500, 55, 640, 120, 22, "#6c2eb9", "#441083", 4);
  drawCenteredText(context, "CERTIFICATE", 820, 138, "700 70px Comic Sans MS, Arial", "#ffffff");
  drawCenteredText(context, "★ OF ACHIEVEMENT ★", 820, 230, "700 40px Comic Sans MS, Arial", "#6c2eb9");

  drawCenteredText(context, `Well done ${appState.learnerName}!`, 860, 350, "700 68px Comic Sans MS, Arial", "#111827");
  drawCenteredText(context, "You have successfully completed", 860, 430, "700 36px Comic Sans MS, Arial", "#111827");
  drawCenteredText(context, "★ GOLD LEVEL ★", 860, 535, "700 82px Comic Sans MS, Arial", "#f1c40f", "#a96a00");
  drawCenteredText(context, "in", 860, 610, "700 34px Comic Sans MS, Arial", "#111827");

  roundedRect(context, 460, 645, 800, 70, 12, "#6c2eb9", "#441083", 2);
  drawCenteredText(context, topic.name.toUpperCase(), 860, 695, "700 38px Comic Sans MS, Arial", "#ffffff");

  drawCenteredText(context, "Amazing work! You have shown great", 860, 790, "700 34px Comic Sans MS, Arial", "#111827");
  drawCenteredText(context, "maths skills, focus and determination.", 860, 835, "700 34px Comic Sans MS, Arial", "#111827");
  drawCenteredText(context, "Keep it up superstar!", 860, 895, "700 38px Comic Sans MS, Arial", "#6c2eb9");

  drawGoldMedal(context, 165, 840);
  drawSignatureBlock(context, 540, 1000, "Dad", "Dad Maths");
  drawSignatureBlock(context, 1080, 1000, certificateDate, "Date");

  roundedRect(context, 255, 1040, 1090, 70, 34, "#441083", "#441083", 0);
  drawCenteredText(context, "★ Work hard, stay positive and always LEVEL UP! ★", 800, 1087, "700 34px Comic Sans MS, Arial", "#ffffff");
}

function roundedRect(context, x, y, width, height, radius, fill, stroke, lineWidth) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
  context.fillStyle = fill;
  context.fill();

  if (stroke && lineWidth) {
    context.strokeStyle = stroke;
    context.lineWidth = lineWidth;
    context.stroke();
  }
}

function drawCenteredText(context, text, x, y, font, fill, stroke) {
  context.save();
  context.font = font;
  context.textAlign = "center";
  context.textBaseline = "middle";
  if (stroke) {
    context.lineWidth = 3;
    context.strokeStyle = stroke;
    context.strokeText(text, x, y);
  }
  context.fillStyle = fill;
  context.fillText(text, x, y);
  context.restore();
}

function drawSoftMathMarks(context, width, height) {
  context.save();
  context.globalAlpha = 0.12;
  context.font = "700 80px Comic Sans MS, Arial";
  context.fillStyle = "#6c2eb9";
  context.fillText("+", 80, 460);
  context.fillText("÷", width - 230, 330);
  context.fillText("×", width - 160, 480);
  context.fillText("=", width - 250, 145);
  context.fillStyle = "#f1c40f";
  context.fillText("+", width - 260, 660);
  context.fillText("×", 250, 600);
  context.restore();
}

function drawGoldMedal(context, x, y) {
  context.save();
  context.fillStyle = "#5b1ca2";
  context.beginPath();
  context.moveTo(x - 45, y + 70);
  context.lineTo(x - 5, y + 160);
  context.lineTo(x + 20, y + 74);
  context.fill();
  context.beginPath();
  context.moveTo(x + 45, y + 70);
  context.lineTo(x + 5, y + 160);
  context.lineTo(x - 20, y + 74);
  context.fill();

  context.beginPath();
  context.arc(x, y, 78, 0, Math.PI * 2);
  context.fillStyle = "#f1c40f";
  context.fill();
  context.lineWidth = 10;
  context.strokeStyle = "#d58900";
  context.stroke();
  drawCenteredText(context, "★", x, y + 4, "700 86px Comic Sans MS, Arial", "#ffffff", "#b97700");
  context.restore();
}

function drawSignatureBlock(context, x, y, topText, bottomText) {
  drawCenteredText(context, topText, x, y - 28, "700 32px Comic Sans MS, Arial", "#111827");
  context.strokeStyle = "#6c2eb9";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(x - 145, y + 12);
  context.lineTo(x + 145, y + 12);
  context.stroke();
  drawCenteredText(context, bottomText, x, y + 45, "700 27px Comic Sans MS, Arial", "#6c2eb9");
}

function normaliseAnswer(value) {
  // Let Lauren type answers naturally, such as "£16.20", "3,000" or "26 cm".
  return String(value).trim().replace(/[^0-9.-]/g, "");
}

function capitalise(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

startLearningButton.addEventListener("click", () => {
  renderLesson(appState.selectedTopic);
  showScreen("lesson");
});

startBronzeButton.addEventListener("click", () => startLevel("bronze"));
checkAnswerButton.addEventListener("click", checkAnswer);
finishTopicButton.addEventListener("click", () => showScreen("home"));
viewCertificateButton.addEventListener("click", showCertificate);
downloadCertificateButton.addEventListener("click", downloadCertificate);
printCertificateButton.addEventListener("click", () => window.print());

answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

document.getElementById("backToHomeFromLesson").addEventListener("click", () => showScreen("home"));
document.getElementById("backToHomeFromQuestions").addEventListener("click", () => showScreen("home"));
document.getElementById("backToCelebrationButton").addEventListener("click", () => showScreen("celebration"));
document.getElementById("certificateTopicsButton").addEventListener("click", () => showScreen("home"));

renderTopics();

// Handy preview route while designing the certificate.
// On GitHub Pages, open index.html#certificate to see the certificate without completing a quiz.
if (window.location.hash === "#certificate") {
  appState.completedTopic = appState.selectedTopic;
  showCertificate();
}
