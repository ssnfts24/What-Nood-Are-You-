/*********************************************
 *            QUIZ QUESTIONS
 *********************************************/
const questions = [
  {
    question: "What is your favorite element?",
    answers: {
      Fire: "Fire Nood",
      Earth: "Earth Nood",
      Shadow: "Shadow Nood",
      Water: "Water Nood",
      Air: "Air Nood",
      Light: "Light Nood",
    },
  },
  /* Add more questions with fun and creative scenarios */
];

/*********************************************
 *         QUIZ STATE AND DATA
 *********************************************/
let currentQuestion = 0;
let username = "";
let results = {
  "Fire Nood": 0,
  "Earth Nood": 0,
  "Shadow Nood": 0,
  "Water Nood": 0,
  "Air Nood": 0,
  "Light Nood": 0,
};

const funFacts = {
  "Fire Nood": "Fire Noods are fierce and powerful, representing passion and transformation.",
  "Earth Nood": "Earth Noods are grounded and stable, embodying strength and resilience.",
  /* Add fun facts for each Nood */
};

/*********************************************
 *   QUIZ LOGIC
 *********************************************/
function startQuiz() {
  username = document.getElementById("username").value;
  if (!username.trim()) {
    alert("Please enter your name to start the quiz!");
    return;
  }

  document.getElementById("user-input").style.display = "none";
  document.querySelector(".progress-container").style.display = "block";
  document.getElementById("quiz").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const questionData = questions[currentQuestion];
  document.getElementById("question").textContent = questionData.question;
  const answersElement = document.getElementById("answers");
  answersElement.innerHTML = "";

  for (const [key, value] of Object.entries(questionData.answers)) {
    const button = document.createElement("button");
    button.textContent = key;
    button.className = "answer-btn";
    button.onclick = (event) => selectAnswer(event, value);
    answersElement.appendChild(button);
  }

  document.getElementById("next-btn").disabled = true;
  updateProgress();
}

function selectAnswer(event, noodType) {
  results[noodType]++;
  document.getElementById("next-btn").disabled = false;
  document.querySelectorAll(".answer-btn").forEach((btn) =>
    btn.classList.remove("selected")
  );
  event.target.classList.add("selected");
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    showResult();
  } else {
    loadQuestion();
  }
}

function updateProgress() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  document.getElementById("progress-bar").style.width = `${progress}%`;
}

/*********************************************
 *        DISPLAY RESULTS
 *********************************************/
function showResult() {
  const dominantNood = Object.keys(results).reduce((a, b) =>
    results[a] > results[b] ? a : b
  );

  document.getElementById("username-output").textContent = username;
  document.getElementById("nood-result").textContent = dominantNood;
  document.getElementById("result-description").textContent = `As a ${dominantNood}, you are truly unique and extraordinary!`;
  document.getElementById("fun-facts").textContent = funFacts[dominantNood];
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";
}

/*********************************************
 *        RESTART QUIZ
 *********************************************/
function restartQuiz() {
  currentQuestion = 0;
  results = {
    "Fire Nood": 0,
    "Earth Nood": 0,
    "Shadow Nood": 0,
    "Water Nood": 0,
    "Air Nood": 0,
    "Light Nood": 0,
  };
  document.getElementById("result").style.display = "none";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("user-input").style.display = "block";
  document.querySelector(".progress-container").style.display = "none";
}
