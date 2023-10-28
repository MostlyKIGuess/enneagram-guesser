const form = document.getElementById("quiz-form");
const resultContainer = document.getElementById("result-container");
const nextButton = document.getElementById("next-button");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");

let currentQuestionIndex = 0;

function showNextQuestion() {
    if (currentQuestionIndex < quizData.length) {
        const questionData = quizData[currentQuestionIndex];
        questionText.textContent = questionData.question;
    } else {
        displayResult();
    }
}

function updateScores(score) {
    for (let i = 0; i < scores.length; i++) {
        scores[i] += score * quizData[currentQuestionIndex].options[i];
    }
}

function displayResult() {
    // Calculate the scores for each personality
    const scores = Array(9).fill(0);

    for (let i = 0; i < quizData.length; i++) {
        const selectedOption = document.querySelector('input[name="q"]:checked');
        if (selectedOption) {
            const score = parseFloat(selectedOption.value);
            updateScores(score);
        }
    }

    // Redirect to the results page and pass the scores as query parameters
    const url = `results.html?${scores.map((score, index) => `p${index}=${score}`).join('&')}`;
    window.location.href = url;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedOption = document.querySelector('input[name="q"]:checked');
    if (selectedOption) {
        const score = parseFloat(selectedOption.value);
        updateScores(score);
    }
    currentQuestionIndex++;
    showNextQuestion();
});

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    showNextQuestion();
});

showNextQuestion();
