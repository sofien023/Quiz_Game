
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startGameBtn").addEventListener("click", newgame1);
    
    document.getElementById("logoutButton").addEventListener("click", function() {
        logout();
    });

    function logout() {
        fetch('logout.php')
            .then(response => {
                if (response.ok) {
                    window.location.href = 'index.html';
                } else {
                    console.error('Logout failed');
                }
            })
            .catch(error => {
                console.error('Error during logout:', error);
            });
    }

    async function fetchQuestion(question_id) {
        try {
            const response = await fetch('http://localhost/game/fetch_question.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question_id})
            });

            const result = await response.json();

            if (result.success) {
                return result.question;
            } else {
                alert(result.message);
                return null;
            }
        } catch (error) {
            console.error('Fetch failed:', error);
            alert('An error occurred while fetching the question.');
            return null;
        }
    }

    function createComponent(text1, text2) {
        return new Promise((resolve) => {
            const container = document.createElement("div");
            container.classList.add("container");

            const textElement1 = document.createElement('p');
            textElement1.textContent = text1;
            textElement1.classList.add("text");
            container.appendChild(textElement1);

            const xValueElement = document.createElement('p');
            xValueElement.textContent = text2;
            xValueElement.classList.add("text");
            container.appendChild(xValueElement);

            const inputElement = document.createElement('input');
            inputElement.setAttribute('type', 'text');
            inputElement.setAttribute('placeholder', 'Enter the answer...');
            inputElement.classList.add("input");
            container.appendChild(inputElement);

            const submitButton = document.createElement('button');
            submitButton.textContent = "Submit";
            submitButton.classList.add("button");
            container.appendChild(submitButton);

            document.body.appendChild(container);
            inputElement.focus();

            submitButton.addEventListener('click', function () {
                const inputValue = inputElement.value.trim();
                resolve(inputValue);
                container.remove();
            });
        });
    }

    async function newgame1() {
        document.body.innerHTML = '';
        let numberOfQuestions = await createComponent("Give the number of Questions:", `Equal to or under ${10} ☺`);
        numberOfQuestions = Number(numberOfQuestions.trim());


        if (isNaN(numberOfQuestions) || numberOfQuestions <= 0 || numberOfQuestions > 10) {
            newgame1();
            return;
        }

        let score = 0;
        x=  Math.round(10 / numberOfQuestions)
        for (let index = 0; index < numberOfQuestions; index++) {
            const question_id = index + 1; 
            const question = await fetchQuestion(question_id);
            if (!question) {
                continue;
            }
            const userAnswer = await createComponent(`Question N: ${index + 1}`, `${question.question_text}`);
            if (userAnswer === question.correct_answer) {
                score += x;
            }
        }
        result(score);
    }

    async function saveGameData(score) {
        try {
            const response = await fetch('http://localhost/game/save_game.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ score })
            });
    
            const result = await response.json();
    
            if (!result.success) {
                alert(result.message);
            }
        } catch (error) {
            console.error('Save game data failed:', error);
            alert('An error occurred while saving game data.');
        }
    }

    function result(score) {
        const container = document.createElement("div");
        container.classList.add("container");
        const textElement1 = document.createElement('p');
        textElement1.textContent = "Here is your result:";
        textElement1.classList.add("text");
        container.appendChild(textElement1);
        const xValueElement = document.createElement('p');
        xValueElement.textContent = `${grade(score)}`;
        xValueElement.classList.add("text");
        container.appendChild(xValueElement);
        const resultElement = document.createElement('p');
        resultElement.textContent = `Here is your score = ${score}`;
        container.appendChild(resultElement);

        const replayButton = document.createElement('input');
        replayButton.setAttribute('type', 'submit');
        replayButton.value = "Replay";
        replayButton.addEventListener('click', newgame1);
        replayButton.classList.add("button");
        container.appendChild(replayButton);

        const btn = document.createElement('input');
        btn.setAttribute('type', 'submit');
        btn.value = "Dashboard";
        btn.classList.add("button");
        container.appendChild(btn);
        
        btn.addEventListener("click", function() {
            container.style.display = "none";
            const gameContainer = document.getElementById("gameContainer");
            gameContainer.style.display = "block";
        });

        document.body.appendChild(container);
    }

    function grade(score) {
        switch (true) {
            case score === 0:
                return "You Lose";
            case score > 0 && score <= 2:
                return "Try Harder";
            case score > 2 && score <= 4:
                return "Keep Going";
            case score > 4 && score <= 6:
                return "You're Amazing!";
            case score > 6 && score < 8:
                return "Excellent!";
            case score === 10:
                return "Perfect!";
            default:
                return "Unknown Score";
        }
    }
});
