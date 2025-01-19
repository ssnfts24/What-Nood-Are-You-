const questions = [
    {
        question: "What is your favorite natural element?",
        answers: ["Water", "Fire", "Earth", "Air", "Shadow", "Light"],
        theme: ["water-theme", "fire-theme", "earth-theme", "air-theme", "shadow-theme", "light-theme"]
    },
    {
        question: "What is your preferred combat style?",
        answers: ["Swift and precise", "Raw power", "Defensive and enduring", "Strategic and adaptable", "Stealthy and cunning", "Radiant and inspiring"],
    },
    {
        question: "What motivates you most?",
        answers: ["Peace and balance", "Passion and ambition", "Stability and loyalty", "Freedom and exploration", "Mystery and secrecy", "Justice and hope"],
    },
];

const results = {
    Water: { description: "Calm and adaptable...", image: "water-nood.png" },
    Fire: { description: "Fierce and passionate...", image: "fire-nood.png" },
    Earth: { description: "Strong and reliable...", image: "earth-nood.png" },
    Air: { description: "Free-spirited and versatile...", image: "air-nood.png" },
    Shadow: { description: "Mysterious and stealthy...", image: "shadow-nood.png" },
    Light: { description: "Radiant and inspiring...", image: "light-nood.png" },
};

let currentQuestionIndex = 0;
let userChoices = [];

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const nextButton = document.getElementById("next-btn");
    const quizContainer = document.querySelector(".quiz-container");

    // Update theme
    quizContainer.className = `quiz-container ${questions[currentQuestionIndex].theme || ''}`;

    // Reset answers and button
    answersElement.innerHTML = "";
    nextButton.disabled = true;

    // Load current question
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    // Add answers
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.className = "answer-btn";
        button.onclick = () => {
            userChoices[currentQuestionIndex] = answer;
            document.querySelectorAll(".answer-btn").forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            nextButton.disabled = false;
        };
        answersElement.appendChild(button);
    });

    updateProgress();
}

function nextQuestion() {
    const quizElement = document.getElementById("quiz");
    const resultElement = document.getElementById("result");

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        // Show result
        quizElement.style.display = "none";
        resultElement.style.display = "block";

        const dominantElement = determineNoodType();
        const resultText = document.getElementById("nood-result");
        const resultDescription = document.getElementById("result-description");
        const resultImage = document.getElementById("result-image");

        resultText.textContent = dominantElement;
        resultDescription.textContent = results[dominantElement].description;
        resultImage.src = results[dominantElement].image;

        document.getElementById("result-sound").play();
    }
}

function determineNoodType() {
    const counts = userChoices.reduce((acc, choice) => {
        acc[choice] = (acc[choice] || 0) + 1;
        return acc;
    }, {});
    return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
}

function updateProgress() {
    const progressBar = document.getElementById("progress-bar");
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

loadQuestion();
