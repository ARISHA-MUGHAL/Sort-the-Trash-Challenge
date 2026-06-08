/* ===============================
   SORT THE TRASH CHALLENGE
   UPDATED script.js
   5 Dustbins + Drag & Drop Logic
   One Attempt Per Email ID
================================ */

/* ===============================
   GOOGLE APPS SCRIPT URL
================================ */

// Paste your deployed Google Apps Script Web App URL here.
// Example:
// const SCRIPT_URL = "https://script.google.com/macros/s/xxxxxxxxxxxxxxxx/exec";

const SCRIPT_URL = "PASTE_YOUR_WEB_APP_URL_HERE";

/* ===============================
   GAME SETTINGS
================================ */

const GAME_DURATION_SECONDS = 5 * 60;
const CORRECT_SCORE = 10;
const INCORRECT_SCORE = -10;
const MAX_QUESTIONS = 100;

/* ===============================
   FIVE DUSTBINS
================================ */

const DEFAULT_BINS = [
  {
    bin: "Blue Bin",
    category: "Hazardous Waste",
    colorClass: "blue",
    key: "blue"
  },
  {
    bin: "Yellow Bin",
    category: "Municipal / Organic Waste",
    colorClass: "yellow",
    key: "yellow"
  },
  {
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    colorClass: "grey",
    key: "grey"
  },
  {
    bin: "Green Bin",
    category: "Reusable Waste",
    colorClass: "green",
    key: "green"
  },
  {
    bin: "Black Bin",
    category: "Food Waste / By-products",
    colorClass: "black",
    key: "black"
  }
];

/* ===============================
   FALLBACK WASTE DATA
   Used only if wasteData.js is not available
================================ */

const FALLBACK_WASTE_ITEMS = [
  {
    item: "Grease Waste",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation:
      "Grease waste is treated as hazardous waste and should be handled through the approved waste disposal route.",
    icon: "⚙️"
  },
  {
    item: "Used Oil",
    bin: "Blue Bin",
    category: "Hazardous Waste",
    explanation:
      "Used oil is hazardous and must be disposed of through the approved hazardous waste route.",
    icon: "🛢️"
  },
  {
    item: "Fruit Peels",
    bin: "Yellow Bin",
    category: "Municipal / Organic Waste",
    explanation:
      "Fruit peels are biodegradable organic waste and should be placed in the municipal or organic waste bin.",
    icon: "🍌"
  },
  {
    item: "Paper Waste",
    bin: "Grey Bin",
    category: "Recyclable / Non-Hazardous Waste",
    explanation:
      "Paper waste is recyclable and should be placed in the recyclable or non-hazardous waste bin.",
    icon: "📄"
  },
  {
    item: "Rejected Biscuits from Stackers",
    bin: "Green Bin",
    category: "Reusable Waste",
    explanation:
      "Rejected biscuits from stackers may be reused as per the defined process and should go into the reusable waste bin.",
    icon: "🍪"
  },
  {
    item: "Burnt Biscuits",
    bin: "Black Bin",
    category: "Food Waste / By-products",
    explanation:
      "Burnt biscuits are food waste or by-products and should be placed in the food waste bin.",
    icon: "🍪"
  }
];

/* ===============================
   STATE VARIABLES
================================ */

let employeeData = {
  name: "",
  email: "",
  department: "",
  designation: ""
};

let gameItems = [];
let currentQuestionIndex = 0;

let score = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let attemptedQuestions = 0;

let timeLeft = GAME_DURATION_SECONDS;
let timerInterval = null;
let gameStartedAt = null;
let gameEndedAt = null;

let currentDraggedItem = null;
let isPointerDragging = false;
let dragClone = null;

/* ===============================
   DOM ELEMENTS
================================ */

const screens = {
  welcome: document.getElementById("welcomeScreen"),
  employee: document.getElementById("employeeScreen"),
  game: document.getElementById("gameScreen"),
  result: document.getElementById("resultScreen"),
  leaderboard: document.getElementById("leaderboardScreen")
};

const startChallengeBtn = document.getElementById("startChallengeBtn");

const employeeForm = document.getElementById("employeeForm");
const employeeNameInput = document.getElementById("employeeName");
const employeeEmailInput = document.getElementById("employeeEmail");
const departmentInput = document.getElementById("department");
const designationInput = document.getElementById("designation");
const formError = document.getElementById("formError");

const scoreDisplay = document.getElementById("scoreDisplay");
const timerDisplay = document.getElementById("timerDisplay");
const timerBox = document.querySelector(".timer-box");
const progressDisplay = document.getElementById("progressDisplay");

const wasteCard = document.getElementById("wasteCard");
const wasteIcon = document.getElementById("wasteIcon");
const wasteItemName = document.getElementById("wasteItemName");

const draggableWaste = document.getElementById("draggableWaste");
const dragItemIcon = document.getElementById("dragItemIcon");
const dragItemName = document.getElementById("dragItemName");

const dustbinGrid = document.getElementById("dustbinGrid");

const feedbackModal = document.getElementById("feedbackModal");
const feedbackCard = document.getElementById("feedbackCard");
const feedbackIcon = document.getElementById("feedbackIcon");
const feedbackTitle = document.getElementById("feedbackTitle");
const feedbackWasteItem = document.getElementById("feedbackWasteItem");
const feedbackBin = document.getElementById("feedbackBin");
const feedbackExplanation = document.getElementById("feedbackExplanation");
const continueBtn = document.getElementById("continueBtn");

const resultHeading = document.getElementById("resultHeading");
const finalScore = document.getElementById("finalScore");
const resultName = document.getElementById("resultName");
const resultDepartment = document.getElementById("resultDepartment");
const resultDesignation = document.getElementById("resultDesignation");
const correctCount = document.getElementById("correctCount");
const incorrectCount = document.getElementById("incorrectCount");
const attemptedCount = document.getElementById("attemptedCount");
const accuracyDisplay = document.getElementById("accuracyDisplay");
const timeTakenDisplay = document.getElementById("timeTakenDisplay");
const submitStatus = document.getElementById("submitStatus");

const viewLeaderboardBtn = document.getElementById("viewLeaderboardBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const backToResultBtn = document.getElementById("backToResultBtn");
const backToHomeBtn = document.getElementById("backToHomeBtn");

const leaderboardDepartment = document.getElementById("leaderboardDepartment");
const leaderboardBody = document.getElementById("leaderboardBody");

/* ===============================
   INITIALIZE
================================ */

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  renderDustbins();
});

/* ===============================
   EVENT LISTENERS
================================ */

function bindEvents() {
  startChallengeBtn.addEventListener("click", () => {
    showScreen("employee");
  });

  employeeForm.addEventListener("submit", handleEmployeeFormSubmit);

  continueBtn.addEventListener("click", () => {
    closeFeedbackModal();
    moveToNextQuestion();
  });

  viewLeaderboardBtn.addEventListener("click", () => {
    showScreen("leaderboard");
    loadLeaderboard();
  });

  playAgainBtn.addEventListener("click", () => {
    resetGame();
    showScreen("employee");
  });

  backToResultBtn.addEventListener("click", () => {
    showScreen("result");
  });

  backToHomeBtn.addEventListener("click", () => {
    resetGame();
    showScreen("welcome");
  });

  leaderboardDepartment.addEventListener("change", () => {
    loadLeaderboard();
  });

  setupDragEvents();
}

/* ===============================
   SCREEN HANDLING
================================ */

function showScreen(screenName) {
  Object.values(screens).forEach((screen) => {
    screen.classList.remove("active");
  });

  screens[screenName].classList.add("active");
}

/* ===============================
   EMPLOYEE FORM
================================ */

async function handleEmployeeFormSubmit(event) {
  event.preventDefault();

  const name = employeeNameInput.value.trim();
  const email = employeeEmailInput.value.trim().toLowerCase();
  const department = departmentInput.value.trim();
  const designation = designationInput.value.trim();

  if (!name || !email || !department || !designation) {
    formError.textContent =
      "Please complete all required fields before starting the game.";
    return;
  }

  if (!isValidEmail(email)) {
    formError.textContent = "Please enter a valid email ID.";
    return;
  }

  formError.textContent = "Checking previous attempt...";

  const alreadyPlayed = await checkEmailAlreadyPlayed(email);

  if (alreadyPlayed) {
    formError.textContent =
      "This email ID has already been used. Only one attempt is allowed per email ID.";
    return;
  }

  formError.textContent = "";

  employeeData = {
    name,
    email,
    department,
    designation
  };

  startGame();
}

/* ===============================
   START GAME
================================ */

function startGame() {
  resetScoreOnly();

  const sourceItems = getWasteItems();
  gameItems = shuffleArray(sourceItems).slice(0, MAX_QUESTIONS);

  if (gameItems.length === 0) {
    alert("No waste items found. Please check wasteData.js.");
    return;
  }

  currentQuestionIndex = 0;
  timeLeft = GAME_DURATION_SECONDS;
  gameStartedAt = new Date();

  showScreen("game");
  renderQuestion();
  startTimer();
}

/* ===============================
   GET WASTE DATA
================================ */

function getWasteItems() {
  if (Array.isArray(window.WASTE_ITEMS) && window.WASTE_ITEMS.length > 0) {
    return window.WASTE_ITEMS;
  }

  if (typeof WASTE_ITEMS !== "undefined" && Array.isArray(WASTE_ITEMS)) {
    return WASTE_ITEMS;
  }

  return FALLBACK_WASTE_ITEMS;
}

function getBins() {
  if (Array.isArray(window.WASTE_BINS) && window.WASTE_BINS.length > 0) {
    return window.WASTE_BINS;
  }

  if (typeof WASTE_BINS !== "undefined" && Array.isArray(WASTE_BINS)) {
    return WASTE_BINS;
  }

  return DEFAULT_BINS;
}

/* ===============================
   EMAIL CHECK
================================ */

async function checkEmailAlreadyPlayed(email) {
  if (!SCRIPT_URL || SCRIPT_URL === "PASTE_YOUR_WEB_APP_URL_HERE") {
    const localResults = getLocalResults();

    return localResults.some((item) => {
      return String(item.email || "").toLowerCase() === email;
    });
  }

  try {
    const response = await fetch(
      `${SCRIPT_URL}?action=checkEmail&email=${encodeURIComponent(email)}`
    );

    const data = await response.json();

    return data.exists === true;
  } catch (error) {
    console.error("Email check failed:", error);

    formError.textContent =
      "Could not verify email ID. Please check internet connection and try again.";

    return true;
  }
}

/* ===============================
   RENDER DUSTBINS
================================ */

function renderDustbins() {
  const bins = getBins();

  dustbinGrid.innerHTML = "";

  bins.forEach((bin) => {
    const binButton = document.createElement("button");

    binButton.type = "button";
    binButton.className = `dustbin-card ${bin.colorClass}`;
    binButton.dataset.bin = bin.bin;
    binButton.dataset.category = bin.category;

    binButton.innerHTML = `
      <div class="bin-illustration" aria-hidden="true">
        <div class="bin-lid"></div>
        <div class="bin-body"></div>
        <div class="bin-wheels">
          <span></span>
          <span></span>
        </div>
      </div>

      <strong class="bin-name">${escapeHTML(bin.bin)}</strong>
      <span class="bin-category">${escapeHTML(bin.category)}</span>
    `;

    binButton.addEventListener("dragover", handleDragOver);
    binButton.addEventListener("dragenter", handleDragEnter);
    binButton.addEventListener("dragleave", handleDragLeave);
    binButton.addEventListener("drop", handleDrop);

    dustbinGrid.appendChild(binButton);
  });
}

/* ===============================
   RENDER QUESTION
================================ */

function renderQuestion() {
  const currentItem = gameItems[currentQuestionIndex];

  if (!currentItem) {
    endGame();
    return;
  }

  currentDraggedItem = currentItem;

  wasteIcon.textContent = currentItem.icon || "🗑️";
  wasteItemName.textContent = currentItem.item;

  dragItemIcon.textContent = currentItem.icon || "🗑️";
  dragItemName.textContent = currentItem.item;

  draggableWaste.dataset.item = currentItem.item;
  draggableWaste.dataset.bin = currentItem.bin;
  draggableWaste.dataset.category = currentItem.category;

  draggableWaste.classList.remove("dragging");
  draggableWaste.style.visibility = "visible";

  progressDisplay.textContent = `Item ${currentQuestionIndex + 1} / ${
    gameItems.length
  }`;

  wasteCard.classList.remove("correct-pulse", "incorrect-shake");

  clearBinHoverEffects();
}

/* ===============================
   DESKTOP DRAG EVENTS
================================ */

function setupDragEvents() {
  draggableWaste.addEventListener("dragstart", handleDragStart);
  draggableWaste.addEventListener("dragend", handleDragEnd);

  draggableWaste.addEventListener("pointerdown", handlePointerDown);
}

function handleDragStart(event) {
  if (!currentDraggedItem) return;

  draggableWaste.classList.add("dragging");

  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", currentDraggedItem.bin);
}

function handleDragEnd() {
  draggableWaste.classList.remove("dragging");
  clearBinHoverEffects();
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function handleDragEnter(event) {
  event.preventDefault();

  const binCard = event.currentTarget;
  binCard.classList.add("drag-over");
}

function handleDragLeave(event) {
  const binCard = event.currentTarget;

  if (!binCard.contains(event.relatedTarget)) {
    binCard.classList.remove("drag-over");
  }
}

function handleDrop(event) {
  event.preventDefault();

  const selectedBin = event.currentTarget.dataset.bin;

  clearBinHoverEffects();
  checkAnswer(selectedBin);
}

/* ===============================
   MOBILE / TOUCH DRAG SUPPORT
================================ */

function handlePointerDown(event) {
  if (!currentDraggedItem) return;

  if (event.pointerType === "mouse") {
    return;
  }

  event.preventDefault();

  isPointerDragging = true;

  draggableWaste.setPointerCapture(event.pointerId);
  draggableWaste.classList.add("dragging");

  createDragClone(event.clientX, event.clientY);

  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerup", handlePointerUp);
  window.addEventListener("pointercancel", handlePointerCancel);
}

function handlePointerMove(event) {
  if (!isPointerDragging || !dragClone) return;

  moveDragClone(event.clientX, event.clientY);

  const binUnderPointer = getBinUnderPointer(event.clientX, event.clientY);

  clearBinHoverEffects();

  if (binUnderPointer) {
    binUnderPointer.classList.add("drag-over");
  }
}

function handlePointerUp(event) {
  if (!isPointerDragging) return;

  const binUnderPointer = getBinUnderPointer(event.clientX, event.clientY);

  cleanupPointerDrag();

  if (binUnderPointer) {
    const selectedBin = binUnderPointer.dataset.bin;
    checkAnswer(selectedBin);
  }
}

function handlePointerCancel() {
  cleanupPointerDrag();
}

function createDragClone(x, y) {
  dragClone = draggableWaste.cloneNode(true);
  dragClone.classList.add("dragging");
  dragClone.style.position = "fixed";
  dragClone.style.left = "0";
  dragClone.style.top = "0";
  dragClone.style.width = `${draggableWaste.offsetWidth}px`;
  dragClone.style.zIndex = "9999";
  dragClone.style.pointerEvents = "none";
  dragClone.style.margin = "0";

  document.body.appendChild(dragClone);

  draggableWaste.style.visibility = "hidden";

  moveDragClone(x, y);
}

function moveDragClone(x, y) {
  if (!dragClone) return;

  const offsetX = dragClone.offsetWidth / 2;
  const offsetY = dragClone.offsetHeight / 2;

  dragClone.style.transform = `translate(${x - offsetX}px, ${
    y - offsetY
  }px) scale(1.04)`;
}

function cleanupPointerDrag() {
  isPointerDragging = false;

  if (draggableWaste) {
    draggableWaste.classList.remove("dragging");
    draggableWaste.style.visibility = "visible";
  }

  if (dragClone) {
    dragClone.remove();
    dragClone = null;
  }

  clearBinHoverEffects();

  window.removeEventListener("pointermove", handlePointerMove);
  window.removeEventListener("pointerup", handlePointerUp);
  window.removeEventListener("pointercancel", handlePointerCancel);
}

function getBinUnderPointer(x, y) {
  const element = document.elementFromPoint(x, y);

  if (!element) return null;

  return element.closest(".dustbin-card");
}

function clearBinHoverEffects() {
  document.querySelectorAll(".dustbin-card").forEach((bin) => {
    bin.classList.remove("drag-over");
  });
}

/* ===============================
   CHECK ANSWER
================================ */

function checkAnswer(selectedBin) {
  const currentItem = gameItems[currentQuestionIndex];

  if (!currentItem) return;

  const correctBin = currentItem.bin;
  const isCorrect = selectedBin === correctBin;

  attemptedQuestions += 1;

  if (isCorrect) {
    score += CORRECT_SCORE;
    correctAnswers += 1;
    wasteCard.classList.add("correct-pulse");
  } else {
    score += INCORRECT_SCORE;
    incorrectAnswers += 1;
    wasteCard.classList.add("incorrect-shake");
  }

  updateScoreDisplay();
  showFeedbackModal(currentItem, isCorrect);
}

/* ===============================
   FEEDBACK MODAL
================================ */

function showFeedbackModal(item, isCorrect) {
  feedbackModal.classList.add("active");

  feedbackCard.classList.remove("correct", "incorrect");
  feedbackCard.classList.add(isCorrect ? "correct" : "incorrect");

  feedbackIcon.textContent = isCorrect ? "✅" : "❌";
  feedbackTitle.textContent = isCorrect ? "Correct!" : "Incorrect";

  feedbackWasteItem.textContent = item.item;
  feedbackBin.textContent = `${item.bin} – ${item.category}`;

  if (isCorrect) {
    feedbackExplanation.textContent =
      item.explanation ||
      `${item.item} belongs in ${item.bin} because it is categorized as ${item.category}.`;
  } else {
    feedbackExplanation.textContent =
      item.explanation ||
      `${item.item} should go in ${item.bin}. Please follow the waste segregation chart for correct disposal.`;
  }
}

function closeFeedbackModal() {
  feedbackModal.classList.remove("active");
}

/* ===============================
   NEXT QUESTION
================================ */

function moveToNextQuestion() {
  currentQuestionIndex += 1;

  if (currentQuestionIndex >= gameItems.length) {
    endGame();
    return;
  }

  renderQuestion();
}

/* ===============================
   TIMER
================================ */

function startTimer() {
  clearInterval(timerInterval);
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft -= 1;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);

  timerBox.classList.remove("warning", "danger");

  if (timeLeft <= 10) {
    timerBox.classList.add("danger");
  } else if (timeLeft <= 60) {
    timerBox.classList.add("warning");
  }
}

function formatTime(totalSeconds) {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

/* ===============================
   SCORE DISPLAY
================================ */

function updateScoreDisplay() {
  scoreDisplay.textContent = score;
}

/* ===============================
   END GAME
================================ */

function endGame() {
  clearInterval(timerInterval);
  closeFeedbackModal();
  cleanupPointerDrag();

  gameEndedAt = new Date();

  const timeTakenSeconds = calculateTimeTakenSeconds();
  const accuracy = calculateAccuracy();

  resultHeading.textContent = `Well Done, ${employeeData.name}!`;
  finalScore.textContent = score;

  resultName.textContent = employeeData.name;
  resultDepartment.textContent = employeeData.department;
  resultDesignation.textContent = employeeData.designation;

  correctCount.textContent = correctAnswers;
  incorrectCount.textContent = incorrectAnswers;
  attemptedCount.textContent = attemptedQuestions;
  accuracyDisplay.textContent = `${accuracy}%`;
  timeTakenDisplay.textContent = formatTime(timeTakenSeconds);

  showScreen("result");

  submitResultToLeaderboard({
    name: employeeData.name,
    email: employeeData.email,
    department: employeeData.department,
    designation: employeeData.designation,
    score,
    correct: correctAnswers,
    incorrect: incorrectAnswers,
    attempted: attemptedQuestions,
    accuracy,
    timeTaken: formatTime(timeTakenSeconds),
    timeTakenSeconds
  });
}

/* ===============================
   CALCULATIONS
================================ */

function calculateAccuracy() {
  if (attemptedQuestions === 0) return 0;

  return ((correctAnswers / attemptedQuestions) * 100).toFixed(1);
}

function calculateTimeTakenSeconds() {
  if (!gameStartedAt || !gameEndedAt) {
    return GAME_DURATION_SECONDS - timeLeft;
  }

  const seconds = Math.floor((gameEndedAt - gameStartedAt) / 1000);

  return Math.min(seconds, GAME_DURATION_SECONDS);
}

/* ===============================
   SUBMIT RESULT TO GOOGLE SHEET
================================ */

async function submitResultToLeaderboard(result) {
  if (!SCRIPT_URL || SCRIPT_URL === "PASTE_YOUR_WEB_APP_URL_HERE") {
    submitStatus.textContent =
      "Score saved locally. Add Google Apps Script URL to enable company leaderboard.";
    saveLocalResult(result);
    return;
  }

  submitStatus.textContent = "Submitting score to leaderboard...";

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action: "submit",
        ...result
      })
    });

    submitStatus.textContent =
      "Your result has been submitted to the leaderboard.";

    saveLocalResult(result);
  } catch (error) {
    console.error("Leaderboard submission failed:", error);

    submitStatus.textContent =
      "Leaderboard submission failed. Your score has been saved locally.";

    saveLocalResult(result);
  }
}

/* ===============================
   LOCAL STORAGE BACKUP
================================ */

function saveLocalResult(result) {
  const localResults = getLocalResults();

  const resultWithTimestamp = {
    timestamp: new Date().toISOString(),
    ...result
  };

  localResults.push(resultWithTimestamp);

  localStorage.setItem("sortTrashLeaderboard", JSON.stringify(localResults));
}

function getLocalResults() {
  const saved = localStorage.getItem("sortTrashLeaderboard");

  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch (error) {
    return [];
  }
}

/* ===============================
   LOAD LEADERBOARD
================================ */

async function loadLeaderboard() {
  const selectedDepartment = leaderboardDepartment.value;

  leaderboardBody.innerHTML = `
    <tr>
      <td colspan="6" class="empty-table">Loading leaderboard...</td>
    </tr>
  `;

  if (!SCRIPT_URL || SCRIPT_URL === "PASTE_YOUR_WEB_APP_URL_HERE") {
    const localResults = getLocalResults();
    renderLeaderboard(localResults, selectedDepartment);
    return;
  }

  try {
    const response = await fetch(
      `${SCRIPT_URL}?action=leaderboard&department=${encodeURIComponent(
        selectedDepartment
      )}`
    );

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid leaderboard response");
    }

    renderLeaderboard(data, selectedDepartment);
  } catch (error) {
    console.error("Leaderboard loading failed:", error);

    const localResults = getLocalResults();
    renderLeaderboard(localResults, selectedDepartment);
  }
}

/* ===============================
   RENDER LEADERBOARD
================================ */

function renderLeaderboard(results, selectedDepartment = "Overall") {
  let filteredResults = Array.isArray(results) ? [...results] : [];

  if (selectedDepartment && selectedDepartment !== "Overall") {
    filteredResults = filteredResults.filter(
      (item) =>
        String(item.department || item.Department || "").trim() ===
        selectedDepartment
    );
  }

  filteredResults.sort((a, b) => {
    const scoreA = Number(a.score || a.Score) || 0;
    const scoreB = Number(b.score || b.Score) || 0;

    const accuracyA = Number(a.accuracy || a.Accuracy) || 0;
    const accuracyB = Number(b.accuracy || b.Accuracy) || 0;

    const timeA =
      Number(a.timeTakenSeconds || a["Time Taken Seconds"]) || 99999;
    const timeB =
      Number(b.timeTakenSeconds || b["Time Taken Seconds"]) || 99999;

    if (scoreB !== scoreA) return scoreB - scoreA;
    if (accuracyB !== accuracyA) return accuracyB - accuracyA;
    return timeA - timeB;
  });

  const topResults = filteredResults.slice(0, 10);

  if (topResults.length === 0) {
    leaderboardBody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-table">
          No leaderboard records found.
        </td>
      </tr>
    `;
    return;
  }

  leaderboardBody.innerHTML = "";

  topResults.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${escapeHTML(item.name || item.Name || "-")}</td>
      <td>${escapeHTML(item.department || item.Department || "-")}</td>
      <td>${escapeHTML(item.designation || item.Designation || "-")}</td>
      <td><strong>${escapeHTML(item.score || item.Score || 0)}</strong></td>
      <td>${escapeHTML(item.accuracy || item.Accuracy || 0)}%</td>
    `;

    leaderboardBody.appendChild(row);
  });
}

/* ===============================
   RESET GAME
================================ */

function resetGame() {
  clearInterval(timerInterval);
  cleanupPointerDrag();

  employeeData = {
    name: "",
    email: "",
    department: "",
    designation: ""
  };

  employeeNameInput.value = "";
  employeeEmailInput.value = "";
  departmentInput.value = "";
  designationInput.value = "";
  formError.textContent = "";

  resetScoreOnly();

  gameItems = [];
  currentQuestionIndex = 0;
  timeLeft = GAME_DURATION_SECONDS;
  gameStartedAt = null;
  gameEndedAt = null;

  updateTimerDisplay();
  updateScoreDisplay();
}

function resetScoreOnly() {
  score = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  attemptedQuestions = 0;

  updateScoreDisplay();

  if (submitStatus) {
    submitStatus.textContent = "";
  }
}

/* ===============================
   UTILITY FUNCTIONS
================================ */

function shuffleArray(array) {
  const copiedArray = [...array];

  for (let i = copiedArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [copiedArray[i], copiedArray[randomIndex]] = [
      copiedArray[randomIndex],
      copiedArray[i]
    ];
  }

  return copiedArray;
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
