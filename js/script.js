// questions array
const question = [
            {
                question: `What does "ZZZ" stand for in the context of game?`,
                answers: [
                    { text: "Zeta Zone Z", correct: false},
                    { text: "Zenless Zone Zero", correct: true},
                    { text: "Zany Zombie Zone", correct: false},
                    { text: "Zero Zenith Zone", correct: false}
                ]
            },
            {
                question: `Which studio/developer published ZZZ?`,
                answers: [
                    { text: "NetEase", correct: false},
                    { text: "Square Enix", correct: false},
                    { text: "Kuro Games", correct: false},
                    { text: "HoYoverse", correct: true}
                ]
            },
            {
                question: `What is the role/title of the character the player controls (or the “operator” role) in ZZZ?`,
                answers: [
                    { text: "Agent", correct: false},
                    { text: "Proxy", correct: true},
                    { text: "Wanderer", correct: false},
                    { text: "Summoner", correct: false}
                ]
            },
            {
                question: `What are the robotic rabbit-like assistants in ZZZ called?`,
                answers: [
                    { text: "Rabbots", correct: false},
                    { text: "HopBots", correct: false},
                    { text: "Bangboos", correct: true},
                    { text: "MechBunnies", correct: false}
                ]
            },
            {
                question: `On which date was ZZZ officially released (outside mainland China)?`,
                answers: [
                    { text: "July 4, 2024", correct: true},
                    { text: "June 6, 2025", correct: false},
                    { text: "August 5, 2023", correct: false},
                    { text: "September 1, 2024", correct: false}
                ]
            },
            {
                question: `Which of the following is NOT a platform ZZZ was released on (initially outside China)?`,
                answers: [
                    { text: "Windows", correct: false},
                    { text: "iOS", correct: false},
                    { text: "PlayStation 5", correct: false},
                    { text: "Nintendo Switch", correct: true}
                ]
            },
            {
                question: `What is the city where Zenless Zone Zero takes place?`,
                answers: [
                    { text: "Hollow City", correct: false},
                    { text: "New Eridu", correct: true},
                    { text: "Etherpolis", correct: false},
                    { text: "Neo Arcadia", correct: false}
                ]
            },
            {
                question: `What kind of enemies do players face in the Hollows in ZZZ?`,
                answers: [
                    { text: "Phantoms", correct: false},
                    { text: "Spectrals", correct: false},
                    { text: "Revenants", correct: false},
                    { text: "Ethereals", correct: true}
                ]
            },
            {
                question: `Which of the following describes Bangboo's function in ZZZ?`,
                answers: [
                    { text: "They replace Proxies", correct: false},
                    { text: "They provide combat support with unique skills", correct: true},
                    { text: "They are only cosmetic pets", correct: false},
                    { text: "They act as currency", correct: false}
                ]
            },
            {
                question: `What is the energy resource that powers New Eridu's survival?`,
                answers: [
                    { text: "Ether", correct: true},
                    { text: "Mana", correct: false},
                    { text: "Corelight", correct: false},
                    { text: "Flux", correct: false}
                ]
            }
        ];

// Get DOM elements
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");

// variables to track quiz state
let currentQuestionIndex = 0;
let shuffledQuestions = 0;
let score = 0;

// start the quiz
function startQuiz(){
    // shuffle the question array randomly
    shuffledQuestions = [...question].sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion(); // show a question
}

// display a question
function showQuestion(){
    resetState(); // clear previous state
    let currentQuestion = shuffledQuestions[currentQuestionIndex]; // get current question
    //question numbering
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // create button for each answer option
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn"); // add css class
        answerButton.appendChild(button);

        // Mark correct answer in dataset
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        // add click event for selecting answer
        button.addEventListener("click", selectAnswer);
    })
}

// reset the UI state for next question
function resetState(){
    nextButton.style.display = "none"; // hide next button
    while(answerButton.firstChild){
        // remove old answer button
        answerButton.removeChild(answerButton.firstChild);
    }
}

// handle answer selection
function selectAnswer(e){
    const selectedButton = e.target; // the clicked answer
    const isCorrect = selectedButton.dataset.correct === "true";

    if(isCorrect){
        selectedButton.classList.add("correct"); // higlights correct answer
        score++;
    }else{
        selectedButton.classList.add("incorrect"); // highlights incorrect answer
    }

    // show correct answer for all buttons
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }

        // disable all button after selection
        button.disabled = true;
    });

    // show Next button
    nextButton.style.display = "block";
}

// display final score
function showScore(){
    resetState();
    questionElement.innerHTML = "Quiz Completed!"
    answerButton.innerHTML = `Your score: ${score} out of ${question.length}`;
    nextButton.innerHTML = "Play Again"; // change button text to "Play Again"
    nextButton.style.display = "block";
}

// move to next question or finish quest
function handleNextButton(){
    currentQuestionIndex++; // go to next question
    if(currentQuestionIndex < question.length){
        showQuestion();

        // if last question, change button text
        if(currentQuestionIndex === question.length - 1){
            nextButton.innerHTML = "Finish Quiz"
        }
    }else{
        showScore(); // show score if no more question
    }
}

// event listener for Next/Play Again button
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < question.length){
        handleNextButton(); // move to next question
    }else{
        startQuiz(); // restart quiz
    }
})

// start the quiz when page loads
startQuiz();