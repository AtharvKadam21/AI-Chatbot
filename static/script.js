// Get references to the open and close buttons and the popup
var openButton = document.getElementById('openPopup');
var closeButton = document.getElementById('closePopup');
var popup = document.getElementById('popup');

// Function to open the popup
openButton.addEventListener('click', function() {
    popup.style.display = 'block';
});

// Function to close the popup
closeButton.addEventListener('click', function() {
    popup.style.display = 'none';
});

// Close the popup if the overlay is clicked
popup.addEventListener('click', function(event) {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});

const questions = [
    {
        question: "How often do you find your mind occupied by recurring thoughts or ideas that you can't easily dismiss?",
        answers: [
            { text: "Rarely", points:1},
            { text: "Occasionally", points:2},
            { text: "Often", points:3},
            { text: "Very Often", points:4},
        ]
    },
    {
        question: "Do you experience heightened anxiety or discomfort when you try to resist these behaviors or rituals?",
        answers: [
            { text: "Rarely", points:1},
            { text: "Occasionally", points:2},
            { text: "Often", points:3},
            { text: "Very Often", points:4},
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.dataset.points = answer.points;
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectdBtn = e.target;
    const questionPt = selectdBtn.dataset.points;
    score +=  parseInt(questionPt);
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = score;

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();