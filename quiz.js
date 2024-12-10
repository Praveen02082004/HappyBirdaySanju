const questions = [
    {
        question:" Which is your favorite animal in the world?",
        answers: [
            { text: "Dog", correct: false},
            { text: "Cat", correct: false},
            { text: "praveen", correct: false},
            { text: "ALL of the above", correct: true},
        ]
    },
    {
        question:" Which is the favorite place in the world?",
        answers: [
            { text: "Manglore hills with praveen", correct: true},
            { text: "Goa", correct: false},
            { text: "Kashmir with Praveen", correct: true},
            { text: "temple", correct: false},
        ]
    },
    {
        question:" What is the best punnishment for praveen?",
        answers: [
            { text: "Beat", correct: false},
            { text: "Not talking with him", correct: false},
            { text: "anger on him", correct: false},
            { text: "Nothing", correct: true},
        ]
    },
    {
        question:" DID you like him really?",
        answers: [
            { text: "yaa", correct: false},
            { text: "yes i like him", correct: true},
            { text: "no", correct: false},
            { text: "may be", correct: false},
        ]
    },
    {
        question:" What is the best name for your future son?",
        answers: [
            { text: "Abdul kalam", correct: false},
            { text: "Chattrapathi Shivaji", correct: false},
            { text: " Lets think a nice name", correct: true},
            { text: "Ambedkar", correct: false},
        ]
    },
    {
        question:"what is the most memorable movement in our love?",
        answers: [
            { text: "Last hug in bus in SMG", correct: true},
            { text: "Temple movement", correct: false},
            { text: "chowtry movement", correct: false},
            { text: "Church movement", correct: false},
        ]
    },
    {
        question:" Select one , what he think about You , Lets guess ?",
        answers: [
            { text: "Princess", correct: true},
            { text: "Queen", correct: true},
            { text: "Second other", correct: true},
            { text: "Perfect Life Partner", correct: true},
        ]
    },

];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const NextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 30;
const timeElement = document.getElementById("time");

// function to update timer
function updateTimeDisplay(){
    const seconds = timeRemaining % 60;
    document.getElementById('clock').textContent = `0:${seconds < 10 ? '0' + seconds:seconds}`;
}

function loadNextQuestion() {
    timeRemaining = 30;
    updateTimeDisplay();
    console.log("loading next question");
    currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        }else{
            showScore();
        }
}

let quizTimer = setInterval(() => {
    if(timeRemaining>0) {
        timeRemaining --;
        updateTimeDisplay();
    }else{
        loadNextQuestion();
        
    }
},1000);

updateTimeDisplay();

// starting the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeRemaining = 30;
    updateTimeDisplay();
    timeElement.style.visibility = "visible";
    NextButton.innerHTML = "Next";

    clearInterval(quizTimer);

    quizTimer = setInterval(() => {
        if(timeRemaining > 0) {
            timeRemaining --;
            updateTimeDisplay();
        }else{
            loadNextQuestion();
        }
    },1000);
    showQuestion();
    }

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    NextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    
}

function selectAnswer(e) {
    const selectedBtn  = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");

        }
        button.disabled = true;
    });
    NextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = ` LOVE You , You scored ${score} out of ${questions.length}!`;
    NextButton.innerHTML = "Play Again";
    NextButton.style.display = "block"; 
    clearInterval(quizTimer);
    timeElement.style.visibility = "hidden";

}

function  handleNextButton(){
    if(currentQuestionIndex < questions.length){
        showQuestion();
        loadNextQuestion();
    }else{
        showScore();
    }
}


NextButton.addEventListener("click",() =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else {
        startQuiz();
    }
});
startQuiz();
