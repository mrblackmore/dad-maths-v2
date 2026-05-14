// Dad Maths V1: simple state, clear functions, no build tools.
const screens = {
  home: document.getElementById("homeScreen"),
  lesson: document.getElementById("lessonScreen"),
  question: document.getElementById("questionScreen"),
  celebration: document.getElementById("celebrationScreen")
};

const topicGrid = document.getElementById("topicGrid");
const startLearningButton = document.getElementById("startLearningButton");
const startBronzeButton = document.getElementById("startBronzeButton");
const checkAnswerButton = document.getElementById("checkAnswerButton");
const finishTopicButton = document.getElementById("finishTopicButton");
const answerInput = document.getElementById("answerInput");
const feedbackBox = document.getElementById("feedbackBox");

const appState = {
  selectedTopic: dadMathsTopics[0],
  currentLevel: "bronze",
  currentQuestionIndex: 0,
  attempts: 0,
  completedLevels: [],
  isMovingToNextQuestion: false
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

answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

document.getElementById("backToHomeFromLesson").addEventListener("click", () => showScreen("home"));
document.getElementById("backToHomeFromQuestions").addEventListener("click", () => showScreen("home"));

renderTopics();
