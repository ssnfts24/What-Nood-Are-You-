/*********************************************
 *            QUIZ QUESTIONS
 *********************************************/
const questions = [
  {
    question: "What is your favorite element?",
    answers: {
      Fire: "Fire Nood",
      Ice: "Ice Nood",
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
      Calmly: "Ice Nood",
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
      Adaptability: "Ice Nood",
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
      Glacier: "Ice Nood",
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
      Morning: "Ice Nood",
    },
  },
  {
    question: "Which trait do you value most in others?",
    answers: {
      Courage: "Fire Nood",
      Patience: "Ice Nood",
      Mystery: "Shadow Nood",
      Compassion: "Water Nood",
      Curiosity: "Air Nood",
      Optimism: "Light Nood",
    },
  },
  {
    question: "How do you prefer to spend your free time?",
    answers: {
      "Adrenaline sports": "Fire Nood",
      "Ice skating or chilling": "Ice Nood",
      "Reading secret tomes": "Shadow Nood",
      "Swimming or surfing": "Water Nood",
      "Skydiving or daydreaming": "Air Nood",
      "Volunteering or helping others": "Light Nood",
    },
  },
  {
    question: "Which color resonates with you the most?",
    answers: {
      Red: "Fire Nood",
      Blue: "Ice Nood",
      Purple: "Shadow Nood",
      Teal: "Water Nood",
      White: "Air Nood",
      Yellow: "Light Nood",
    },
  },
  {
    question: "What kind of music do you enjoy?",
    answers: {
      Rock: "Fire Nood",
      Classical: "Ice Nood",
      EDM: "Shadow Nood",
      Acoustic: "Water Nood",
      Ambient: "Air Nood",
      Pop: "Light Nood",
    },
  },
  {
    question: "How would friends describe your personality?",
    answers: {
      Energetic: "Fire Nood",
      Reliable: "Ice Nood",
      Mysterious: "Shadow Nood",
      Supportive: "Water Nood",
      Imaginative: "Air Nood",
      Cheerful: "Light Nood",
    },
  },
];

/*********************************************
 *         QUIZ STATE AND DATA
 *********************************************/
let currentQuestion = 0;
let results = {
  "Fire Nood": 0,
  "Ice Nood": 0,
  "Shadow Nood": 0,
  "Water Nood": 0,
  "Air Nood": 0,
  "Light Nood": 0,
};

const funFacts = {
  "Fire Nood": "Fire Noods are fierce and powerful, representing passion and transformation.",
  "Ice Nood": "Ice Noods are calm and collected, embodying balance and precision.",
  "Shadow Nood": "Shadow Noods are mysterious and strategic, thriving in complexity and subtlety.",
  "Water Nood": "Water Noods are adaptive and empathetic, flowing effortlessly through challenges.",
  "Air Nood": "Air Noods are free-spirited and creative, soaring above limitations.",
  "Light Nood": "Light Noods are radiant and optimistic, bringing hope and inspiration to others.",
};

/*********************************************
 *   DOM ELEMENTS
 *********************************************/
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const quizContainer = document.querySelector(".quiz-container");

/*********************************************
 *   QUIZ LOGIC
 *********************************************/

/** Shuffles the questions array */
function shuffleQuestions() {
  questions.sort(() => Math.random() - 0.5);
}

/** Loads the current question and possible answers */
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

/** Handles answer selection */
function selectAnswer(event, noodType) {
  results[noodType]++;
  nextButton.disabled = false;

  document.querySelectorAll(".answer-btn").forEach((btn) =>
    btn.classList.remove("selected")
  );
  event.target.classList.add("selected");
}

/** Moves to the next question or shows the result */
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    showResult();
  } else {
    loadQuestion();
  }
}

/** Updates the progress bar */
function updateProgress() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

/** Displays the result */
function showResult() {
  const resultContainer = document.getElementById("result");
  const quizContainer = document.getElementById("quiz");
  const resultText = document.getElementById("nood-result");
  const resultDescription = document.getElementById("result-description");
  const resultImage = document.getElementById("result-image");
  const funFactsElement = document.getElementById("fun-facts");

  const dominantNood = Object.keys(results).reduce((a, b) =>
    results[a] > results[b] ? a : b
  );

  resultText.textContent = dominantNood; // No extra "a"
  resultDescription.textContent = `Congratulations! You are ${dominantNood}, representing its unique qualities.`;
  resultImage.src = `${dominantNood.toLowerCase().replace(" ", "-")}.png`;
  funFactsElement.textContent = funFacts[dominantNood];

  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
}

/** Restarts the quiz */
function restartQuiz() {
  currentQuestion = 0;
  results = {
    "Fire Nood": 0,
    "Ice Nood": 0,
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
 *  INITIALIZE THE QUIZ
 *********************************************/
loadQuestion();
