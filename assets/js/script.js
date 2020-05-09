var startButton = document.getElementById('start-btn');
var mainPage = 'start';
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerEl = document.getElementById('answer-buttons');
var scorePage = document.getElementById('score');
var displayScoreVal = document.getElementById('total-score');
var totalScore = 0;
var timeLeft = 75;
var timerEl = document.getElementById("countdown");
var timerElzero = document.getElementById("countdown-0");
var correctAnswer = document.getElementById('correct');
var wrongAnswer = document.getElementById('wrong');
var initials = document.getElementById('initials');
var initialsEntered = document.getElementById('initials-entered');
var submitScore = document.getElementById("submit-btn");
var highScores = JSON.parse(localStorage.getItem("highScores")) || []; // get the score, or the initial value if empty 
const MAX_HIGH_SCORES = 5;


function startGame() {
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;
        
    if (timeLeft <= 0) {
        displayScore();
        clearInterval(timeInterval);
    }

}, 1000);

startButton.classList.add('hide'); //hides start button once clicked
    document.getElementById(mainPage).style.display = "none"; //hides main Page text once start is clicked
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function displayScore () {
    resetState();
    questionEl.classList.add('hide');
    timerEl.classList.add('hide');
    timerElzero.classList.remove('hide');
    displayScoreVal.textContent = totalScore;
    scorePage.classList.remove('hide');

    localStorage.setItem('mostRecentScore', totalScore);

    //hide final "Correct/Wrong" result once player starts to enter initials
    initials.addEventListener('keyup', () => {
        wrongAnswer.classList.add('hide');
        correctAnswer.classList.add('hide');
    }); 


var mostRecentScore = localStorage.getItem('mostRecentScore');

submitScore.addEventListener('click', function(e) {
    e.preventDefault();
    
    const score = {
        score: mostRecentScore,
        initials: initials.value
    };
    if (initials.value === "") {
        window.alert("Initials cannot be blank");
    } else {
        highScores.push(score);

        highScores.sort((a, b) => b.score - a.score); //sorts highscores in order
        highScores.splice(5); //keeps top 5 scores in highscore local storage
        
        localStorage.setItem("highScores", JSON.stringify(highScores));
        window.location.assign("highscores.html")
    }
});

initialsEntered.reset();
}
    
function showQuestion(question) {
    if (currentQuestionIndex < questions.length) {
    questionEl.innerText = question.question;
    Array.from(question.answers).forEach(answer => {
        var button = document.createElement ('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerEl.appendChild(button);
        // replace previous question/answer set as long as there are more questions to ask
        button.addEventListener('click', function() {
            if (currentQuestionIndex < questions.length) {
                currentQuestionIndex++;
                setNextQuestion();
            }
        });
    });
    } else {
        displayScore();
    }
}
//clears created buttons
function resetState() {

    while (answerEl.firstChild) {
        answerEl.removeChild(answerEl.firstChild);
    }
}
//add 10 points if correct answer selected, remove 5 points and 15 seconds if wrong answer selected, displays "Correct!" or "Wrong!" based on selection
function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;

    if (correct) {
        totalScore += 10;
        console.log("total score "+ totalScore);
        correctAnswer.classList.remove('hide');
        wrongAnswer.classList.add('hide');
    } else {
        wrongAnswer.classList.remove('hide');
        correctAnswer.classList.add('hide');
        if(timeLeft >= 15) {
            timeLeft -= 15;
        } else {
            timeLeft = 0;
        }
        if(totalScore >= 5) {
            totalScore -= 5;
        } else {
            totalScore = 0;
        }
    }
}

startButton.addEventListener('click', startGame);

// The array of questions for our quiz game.
var questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        answers: [
            { text: 'strings', correct: false },
            { text: 'booleans', correct: false },
            { text: 'alerts', correct: false },
            { text: 'numbers', correct: true },
        ]
    },
    {
        question: 'The condition in an if/else statement is enclosed with ______.',
        answers: [
            { text: 'quotes', correct: false },
            { text: 'curly brackets', correct: false },
            { text: 'parenthesis', correct: true  },
            { text: 'square brackets', correct: false },
        ]
    },
    {
        question: 'Arrays in JavaScript can be used to store ______.',
        answers: [
            { text: 'numbers and strings', correct: false },
            { text: 'other arrays', correct: false },
            { text: 'booleans', correct: false },
            { text: 'all of the above', correct: true },
        ]
    },
    {
        question: 'String values must be enclosed within ______ when being assigned to variables.',
        answers: [
            { text: 'commas', correct: false },
            { text: 'curly brackets', correct: false },
            { text: 'quotes', correct: true  },
            { text: 'parenthesis', correct: false },
        ]
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: [
            { text: 'JavaScript', correct: false },
            { text: 'terminal/bash', correct: false },
            { text: 'for loops', correct: false },
            { text: 'console.log', correct: true },
        ]
    }
];
