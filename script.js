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
];

const funFacts = {
  "Fire Nood": "Fire Noods are passionate and driven, embodying energy and transformation.",
  "Earth Nood": "Earth Noods are grounded, reliable, and resilient in their determination.",
  "Shadow Nood": "Shadow Noods are intelligent and thrive in complex situations.",
  "Water Nood": "Water Noods are adaptive, empathetic, and flow gracefully through challenges.",
  "Air Nood": "Air Noods are imaginative, creative, and free-spirited.",
  "Light Nood": "Light Noods radiate positivity and bring hope to others.",
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
let currentQuestion = 0;
let results = {
  "Fire Nood": 0,
  "Earth Nood": 0,
  "Shadow Nood": 0,
  "Water Nood": 0,
  "Air Nood": 0,
  "Light Nood": 0,
};

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

function showResult() {
  const dominantNood = Object.keys(results).reduce((a, b) =>
    results[a] > results[b] ? a : b
  );

  document.getElementById("nood-result").textContent = dominantNood;
  document.getElementById("result-description").textContent = `You are a ${dominantNood}, representing unique qualities.`;
  document.getElementById("result-image").src = imageUrls[dominantNood];
  document.getElementById("fun-facts").textContent = funFacts[dominantNood];

  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";
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
