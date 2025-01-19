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
    question: "What kind of environment do you feel most at home in?",
    answers: {
      Volcano: "Fire Nood",
      Forest: "Earth Nood",
      Cave: "Shadow Nood",
      Ocean: "Water Nood",
      Sky: "Air Nood",
      Meadow: "Light Nood",
    },
  },
  {
    question: "What is your favorite time of day?",
    answers: {
      Dawn: "Light Nood",
      Noon: "Air Nood",
      Sunset: "Water Nood",
      Night: "Shadow Nood",
      Afternoon: "Fire Nood",
      Morning: "Earth Nood",
    },
  },
  {
    question: "Which trait do you value most in others?",
    answers: {
      Courage: "Fire Nood",
      Stability: "Earth Nood",
      Mystery: "Shadow Nood",
      Compassion: "Water Nood",
      Curiosity: "Air Nood",
      Optimism: "Light Nood",
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
  "Fire Nood": "Fire Noods are fierce and powerful, representing passion and transformation.",
  "Earth Nood": "Earth Noods are strong and grounded, embodying stability and resilience.",
  "Shadow Nood": "Shadow Noods are mysterious and strategic, thriving in complexity and subtlety.",
  "Water Nood": "Water Noods are adaptive and empathetic, flowing gracefully through challenges.",
  "Air Nood": "Air Noods are free-spirited and imaginative, soaring above limitations.",
  "Light Nood": "Light Noods are radiant and optimistic, bringing hope and inspiration to others.",
};

const imageUrls = {
  "Fire Nood": "https://freenudessol.wordpress.com/wp-content/uploads/2025/01/firefly-a-cartoon-inspired-2d-illustration-of-a-green-bird-like-character-the-common-fire-nood-4.jpg?resize=160%2C160",
  "Earth Nood": "https://freenudessol.wordpress.com/wp-content/uploads/2025/01/firefly-a-cartoon-inspired-2d-illustration-of-a-green-bird-like-character-the-common-earth-nood-2025-01-07t164839.280.jpg?resize=160%2C160",
  "Shadow Nood": "https://freenudessol.wordpress.com/wp-content/uploads/2025/01/firefly-a-cartoon-inspired-2d-illustration-of-a-green-bird-like-character-the-common-shadow-nood-2.jpg?resize=160%2C160",
  "Water Nood": "https://freenudessol.wordpress.com/wp-content/uploads/2025/01/firefly-a-cartoon-inspired-2d-illustration-of-a-green-bird-like-character-the-common-water-nood.jpg?resize=160%2C160",
  "Air Nood": "https://freenudessol.wordpress.com/wp-content/uploads/2025/01/firefly-a-cartoon-inspired-2d-illustration-of-a-somewhat-short-green-bird-like-character-the-comm-3.jpg?resize=160%2C160",
  "Light Nood": "https://freenudessol.wordpress.com/wp-content/uploads/2025/01/firefly-a-cartoon-inspired-2d-illustration-of-a-bright-green-bird-like-character-the-common-light-2.jpg?resize=160%2C160",
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
    button.onclick = (event) => selectAnswer(event, value);
    answersElement.appendChild(button);
  }

  document.getElementById("next-btn").disabled = true;
  updateProgress();
}

function selectAnswer(event, noodType) {
  results[noodType]++;
  document.getElementById("next-btn").disabled = false;

  document.querySelectorAll(".answer-btn").forEach((btn) => btn.classList.remove("selected"));
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
  document.getElementById("progress-text").textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

/*********************************************
 *        DISPLAY RESULTS
 *********************************************/
function showResult() {
  const dominantNood = Object.keys(results).reduce((a, b) => (results[a] > results[b] ? a : b));

  document.getElementById("nood-result").textContent = dominantNood;
  document.getElementById("result-description").textContent = `Congratulations! You are a ${dominantNood}, representing its unique qualities.`;
  document.getElementById("result-image").src = imageUrls[dominantNood];
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
  document.getElementById("quiz").style.display = "block";
  loadQuestion();
}

/*********************************************
 *        INITIALIZE QUIZ
 *********************************************/
loadQuestion();
