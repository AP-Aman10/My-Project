const questions = [
    {
        question: "Q1: Which city is the capital of India?",
        answers: [
            { text: "Mumbai", correct: false },
            { text: "Kolkata", correct: false },
            { text: "New Delhi", correct: true },
            { text: "Chennai", correct: false }
        ]
    },
    {
        question: "Q2: What is the longest river in India?",
        answers: [
            { text: "Yamuna", correct: false },
            { text: "Ganga", correct: true },
            { text: "Brahmaputra", correct: false },
            { text: "Godavari", correct: false }
        ]
    },
    {
        question: "Q3: Who was the first Prime Minister of India?",
        answers: [
            { text: "Mahatma Gandhi", correct: false },
            { text: "Sardar Vallabhbhai Patel", correct: false },
            { text: "Dr. B. R. Ambedkar", correct: false },
            { text: "Jawaharlal Nehru", correct: true }
        ]
    },
    {
        question: "Q4: What is the currency of India?",
        answers: [
            { text: "Dollar", correct: false },
            { text: "Rupee", correct: true },
            { text: "Yen", correct: false },
            { text: "Euro", correct: false }
        ]
    },
    {
        question: "Q5: How many states does India have?",
        answers: [
            { text: "28", correct: true },
            { text: "29", correct: false },
            { text: "27", correct: false },
            { text: "30", correct: false }
        ]
    },
    {
        question: "Q6: What is the national flower of India?",
        answers: [
            { text: "Rose", correct: false },
            { text: "Lotus", correct: true },
            { text: "Jasmine", correct: false },
            { text: "Sunflower", correct: false }
        ]
    },
    {
        question: "Q7: When did India gain independence?",
        answers: [
            { text: "1950", correct: false },
            { text: "1942", correct: false },
            { text: "1947", correct: true },
            { text: "1930", correct: false }
        ]
    },
    {
        question: "Q8: What is the tallest mountain in the world?",
        answers: [
            { text: "Mount Everest", correct: true },
            { text: "K2", correct: false },
            { text: "Kangchenjunga", correct: false },
            { text: "Makalu", correct: false }
        ]
    },
    {
        question: "Q9: Which organ pumps blood in the human body?",
        answers: [
            { text: "Heart", correct: true },
            { text: "Lungs", correct: false },
            { text: "Liver", correct: false },
            { text: "Kidneys", correct: false }
        ]
    },
    {
        question: "Q10: What is the chemical formula for water?",
        answers: [
            { text: "CO₂", correct: false },
            { text: "O₂", correct: false },
            { text: "NaCl", correct: false },
            { text: "H₂O", correct: true }
        ]
    },
    {
        question: "Q11: Who invented the light bulb?",
        answers: [
            { text: "Isaac Newton", correct: false },
            { text: "Thomas Edison", correct: true },
            { text: "Albert Einstein", correct: false },
            { text: "Nikola Tesla", correct: false }
        ]
    },
    {
        question: "Q12: Which festival is known as the Festival of Colors?",
        answers: [
            { text: "Holi", correct: true },
            { text: "Diwali", correct: false },
            { text: "Eid", correct: false },
            { text: "Raksha Bandhan", correct: false }
        ]
    },
    {
        question: "Q13: What is the freezing point of water?",
        answers: [
            { text: "0°C", correct: true },
            { text: "32°C", correct: false },
            { text: "100°C", correct: false },
            { text: "-10°C", correct: false }
        ]
    },
    {
        question: "Q14: Which festival is known as the Festival of Light?",
        answers: [
            { text: "Holi", correct: false },
            { text: "Diwali", correct: true },
            { text: "Eid", correct: false },
            { text: "Raksha Bandhan", correct: false }
        ]
    },
    {
        question: "Q15: What planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Mercury", correct: false },
            { text: "Mars", correct: true }
        ]
    },
    {
        question: "Q16: Which is the smallest continent?",
        answers: [
            { text: "Europe", correct: false },
            { text: "Antarctica", correct: false },
            { text: "South America", correct: false },
            { text: "Australia", correct: true }
        ]
    },
    {
        question: "Q17: What is the boiling point of water?",
        answers: [
            { text: "90°C", correct: false },
            { text: "100°C", correct: true },
            { text: "120°C", correct: false },
            { text: "110°C", correct: false }
        ]
    },
    {
        question: "Q18: Which instrument has keys, pedals, and strings?",
        answers: [
            { text: "Piano", correct: true },
            { text: "Guitar", correct: false },
            { text: "Drum", correct: false },
            { text: "Violin", correct: false }
        ]
    },
    {
        question: "Q19: Which gas do plants absorb from the air?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Nitrogen", correct: false },
            { text: "Hydrogen", correct: false },
            { text: "Carbon Dioxide", correct: true }
        ]
    },
    {
        question: "Q20: How many colors are in a rainbow?",
        answers: [
            { text: "6", correct: false },
            { text: "8", correct: false },
            { text: "7", correct: true },
            { text: "5", correct: false }
        ]
    },
    {
        question: "Q21: What is the main source of light during the day?",
        answers: [
            { text: "Moon", correct: false },
            { text: "Stars", correct: false },
            { text: "Lamp", correct: false },
            { text: "Sun", correct: true }
        ]
    },
    {
        question: "Q22: Which is the national bird of India?",
        answers: [
            { text: "Parrot", correct: false },
            { text: "Peacock", correct: true },
            { text: "Eagle", correct: false },
            { text: "Sparrow", correct: false }
        ]
    },
    {
        question: "Q23: Which animal is called the 'Ship of the Desert'?",
        answers: [
            { text: "Horse", correct: false },
            { text: "Elephant", correct: false },
            { text: "Camel", correct: true },
            { text: "Donkey", correct: false }
        ]
    },
    {
        question: "Q24: What is the national sport of India?",
        answers: [
            { text: "Cricket", correct: false },
            { text: "Kabaddi", correct: false },
            { text: "Hockey", correct: true },
            { text: "Football", correct: false }
        ]
    },
    {
        question: "Q25: Who discovered gravity?",
        answers: [
            { text: "Isaac Newton", correct: true },
            { text: "Albert Einstein", correct: false },
            { text: "Galileo Galilei", correct: false },
            { text: "Marie Curie", correct: false }
        ]
    }
];

let timerInterval;
const timerEl = document.getElementById('timer');
const timeBar = document.getElementById('time-bar');
let isAnswered = false

let questionNumber = document.getElementById('question-number')

function ShowAnswer() {
    Array.from(document.getElementById("answer-buttons").children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
}

function startTimer() {
    let timeLeft = 10;
    const totalTime = 10;

    // Reset styles
    timerEl.innerText = timeLeft;
    timeBar.style.transition = 'none';
    timeBar.style.width = '100%';

    void timeBar.offsetWidth;

    timeBar.style.transition = `width ${totalTime}s linear`;
    timeBar.style.width = '0%';

    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerEl.innerText = 0;

            if (!isAnswered) {
                ShowAnswer();
                setTimeout(ShowNextQuestion, 800);
            }
        }
    }, 1000);
}

const questionNumberBox = document.getElementById("question-number-box");

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quizContainer = document.getElementById("app");

let currentQuestionIndex = 0;
let score = 0;

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct")
        score = score +4;
    }
    else {
        selectedBtn.classList.add("incorrect")
        score = score -1;
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    isAnswered = true;
    setTimeout(() => { ShowNextQuestion() }, 1000);
}

function showOptions(currentQuestion) {
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButtons.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });

}

function showQuestion() {
    startTimer()
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionNumber.innerHTML = `Q. ${questionNo} of ${questions.length}`
    questionElement.innerHTML = currentQuestion.question
    showOptions(currentQuestion)
}

function startQuiz() {
    nextButton.style.display = "none";
    timerEl.style.visibility = "visible";
    timeBar.style.visibility = "visible";
    questionNumber.style.visibility = "visible";

    currentQuestionIndex = -1;
    score = 0;
    ShowNextQuestion()
}

function showScore() {
    timerEl.style.visibility = "hidden";
    timeBar.style.visibility = "hidden";
    questionNumber.style.visibility = "hidden"
    clearInterval(timerInterval)
    resetState();
    questionElement.innerHTML = `Score: ${score}`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

}

startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    quizContainer.style.display = "block";
    quizContainer.classList.add("fade-in");
    startQuiz()
});

nextButton.addEventListener("click", (e) => {
    startQuiz()
})

function ShowNextQuestion() {
    debugger
    clearInterval(timerInterval)
    isAnswered = false
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore()
    }

}