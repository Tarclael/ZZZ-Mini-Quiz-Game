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

        const questionElement = document.getElementById("question");
        const answerButton = document.getElementById("answer-btn");
        const nextButton = document.getElementById("next-btn");

        let currentQuestionIndex = 0;
        let shuffledQuestions = 0;
        let score = 0;

        function startQuiz(){
            shuffledQuestions = [...question].sort(() => Math.random() - 0.5)
            currentQuestionIndex = 0;
            score = 0;
            nextButton.innerHTML = "Next";
            showQuestion();
        }

        function showQuestion(){
            resetState();
            let currentQuestion = shuffledQuestions[currentQuestionIndex];
            let questionNo = currentQuestionIndex + 1;
            questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

            currentQuestion.answers.forEach(answer => {
                const button = document.createElement("button");
                button.innerHTML = answer.text;
                button.classList.add("btn");
                answerButton.appendChild(button);
                if(answer.correct){
                    button.dataset.correct = answer.correct;
                }
                button.addEventListener("click", selectAnswer);
            })
        }

        function resetState(){
            nextButton.style.display = "none";
            while(answerButton.firstChild){
                answerButton.removeChild(answerButton.firstChild);
            }
        }

        function selectAnswer(e){
            const selectedButton = e.target;
            const isCorrect = selectedButton.dataset.correct === "true";
            if(isCorrect){
                selectedButton.classList.add("correct");
                score++;
            }else{
                selectedButton.classList.add("incorrect");
            }
            Array.from(answerButton.children).forEach(button =>{
                if(button.dataset.correct === "true"){
                    button.classList.add("correct");
                }
                button.disabled = true;
            });
            nextButton.style.display = "block";
        }

        function showScore(){
            resetState();
            questionElement.innerHTML = "Quiz Completed!"
            answerButton.innerHTML = `Your score: ${score} out of ${question.length}`;
            nextButton.innerHTML = "Play Again";
            nextButton.style.display = "block";
        }

        function handleNextButton(){
            currentQuestionIndex++;
            if(currentQuestionIndex < question.length){
                showQuestion();
                if(currentQuestionIndex === question.length - 1){
                    nextButton.innerHTML = "Finish Quiz"
                }
            }else{
                showScore();
            }
        }

        nextButton.addEventListener("click", () => {
            if(currentQuestionIndex < question.length){
                handleNextButton();
            }else{
                startQuiz();
            }
        })

        startQuiz();