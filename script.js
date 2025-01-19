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
  {
    question: "What is your greatest strength?",
    answers: {
      Power: "Fire Nood",
      Resilience: "Earth Nood",
      Intelligence: "Shadow Nood",
      Creativity: "Air Nood",
      Empathy: "Water Nood",
      Hope: "Light Nood",
    },
  },
  {
    question: "Which environment feels like home?",
    answers: {
      Volcano: "Fire Nood",
      Forest: "Earth Nood",
      Cave: "Shadow Nood",
      Ocean: "Water Nood",
      Sky: "Air Nood",
      Meadow: "Light Nood",
    },
  },
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
  "Fire Nood": "Fire Noods are passionate and energetic.",
  "Earth Nood": "Earth Noods are grounded and dependable.",
  "Shadow Nood": "Shadow Noods are mysterious and insightful.",
  "Water Nood": "Water Noods are adaptable and empathetic.",
  "Air Nood": "Air Noods are creative and free-spirited.",
  "Light Nood": "Light Noods are optimistic and uplifting.",
};

const imageUrls = {
  "Fire Nood": "https://example.com/fire.jpg",
  "Earth Nood": "https://example.com/earth.jpg",
  "Shadow Nood": "https://example.com/shadow.jpg",
  "Water Nood": "https://example.com/water.jpg",
  "Air Nood": "https://example.com/air.jpg",
  "Light Nood": "https://example.com/light.jpg",
};

/*********************************************
 *   QUIZ LOGIC
 *********************************************/
function loadQuestion() {
  const questionData = questions[currentQuestion];
  document.getElementById("question").textContent = questionData.question;
  const answersElement = document.getElementById("answers");
  answersElement.innerHTML = "";

  for (const [key, value] of Object.entries(questionData.answers)) {
    const button = document.createElement("button");
    button.textContent = key;
    button.className = "answer-btn";
    button.onclick = () => selectAnswer(value);
    answersElement.appendChild(button);
  }

  document.getElementById("next-btn").disabled = true;
  updateProgress();
}

function selectAnswer(noodType) {
  results[noodType]++;
  document.getElementById("next-btn").disabled = false;
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
  document.getElementById("progress-text").textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

function showResult() {
  const dominantNood = Object.keys(results).reduce((a, b) => (results[a] > results[b] ? a : b));
  document.getElementById("nood-result").textContent = dominantNood;
  document.getElementById("result-description").textContent = `Congratulations! You are a ${dominantNood}.`;
  document.getElementById("result-image").src = imageUrls[dominantNood];
  document.getElementById("fun-facts").textContent = funFacts[dominantNood];

  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";
}

function restartQuiz() {
  currentQuestion = 0;
  Object.keys(results).forEach((key) => (results[key] = 0));
  document.getElementById("quiz").style.display = "block";
  document.getElementById("result").style.display = "none";
  loadQuestion();
}

/*********************************************
 *        INITIALIZE QUIZ
 *********************************************/
loadQuestion();
