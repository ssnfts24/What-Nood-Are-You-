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
  {
    question: "How do you approach challenges?",
    answers: {
      Boldly: "Fire Nood",
      Steadily: "Earth Nood",
      Strategically: "Shadow Nood",
      Adaptively: "Water Nood",
      Freely: "Air Nood",
      Optimistically: "Light Nood",
    },
  },
  // Add more questions as needed
];

/*********************************************
 *         QUIZ STATE AND DATA
 *********************************************/
let currentQuestion = 0;
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
  "Earth Nood": "Earth Noods are strong and grounded, embodying stability and resilience.",
  "Shadow Nood": "Shadow Noods are strategic, thriving in complexity and subtlety.",
  "Water Nood": "Water Noods are adaptive and empathetic, flowing effortlessly through challenges.",
  "Air Nood": "Air Noods are free-spirited, soaring above limitations.",
  "Light Nood": "Light Noods are radiant, bringing hope and inspiration.",
};

const imageUrls = {
  "Fire Nood": "https://example.com/fire-nood.png",
  "Earth Nood": "https://example.com/earth-nood.png",
  "Shadow Nood": "https://example.com/shadow-nood.png",
  "Water Nood": "https://example.com/water-nood.png",
  "Air Nood": "https://example.com/air-nood.png",
  "Light Nood": "https://example.com/light-nood.png",
};

/*********************************************
 *   QUIZ LOGIC
 *********************************************/
function loadQuestion() {
  const questionData = questions[currentQuestion];
  questionElement.textContent = questionData.question;
  answersElement.innerHTML = "";

  for (const [key, value] of Object.entries(questionData.answers)) {
    const button = document.createElement("button");
    button.textContent = key;
    button.className = "answer-btn";
    button.onclick = (event) => selectAnswer(event, value);
    answersElement.appendChild(button);
  }

  nextButton.disabled = true;
  updateProgress();
}

function selectAnswer(event, noodType) {
  results[noodType]++;
  nextButton.disabled = false;

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
  progressBar.style.width = `${progress}%`;
}

function showResult() {
  const dominantNood = Object.keys(results).reduce((a, b) =>
    results[a] > results[b] ? a : b
  );

  resultText.textContent = `${dominantNood}`;
  resultDescription.textContent = `Congratulations! You are a ${dominantNood}, representing its unique qualities.`;
  resultImage.src = imageUrls[dominantNood];
  funFactsElement.textContent = funFacts[dominantNood];

  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
}

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
  document.getElementById("quiz").style.display = "block";
  loadQuestion();
}

loadQuestion();
