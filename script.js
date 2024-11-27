document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.querySelector('#theme-select');
    const continueBtn = document.querySelector('.continue-btn');
    const inputField = document.querySelector('.input-field');
    const typingText = document.querySelector('.typing-text');
    const englishText = document.querySelector('.english-text p');
    const portugueseText = document.querySelector('.translation-text p');
    const mistakeTag = document.querySelector('.mistake span');
    const scoreTag = document.querySelector('.score span');
    const phaseTag = document.querySelector('.phase span');
    const tryAgainBtn = document.querySelector('.try-again-btn');
    const sideMenu = document.querySelector('.side-menu');
    const openMenuBtn = document.querySelector('.open-menu');
    const closeMenuBtn = document.querySelector('.close-menu');
    const restartBtn = document.querySelector('.restart-btn');
    const difficultySelect = document.querySelector('#difficulty-select');

    let charIndex = 0;
    let mistakes = 0;
    let score = 0;
    let phase = 1;
    let maxErrors = 5; // Default for medium difficulty
    let currentText = "";
    let typingStarted = false;

    const textThemes = {
        history: [
            { english: "The Roman Empire was one of the largest in history.", portuguese: "O Império Romano foi um dos maiores da história." },
            { english: "The Renaissance began in Italy in the 14th century.", portuguese: "O Renascimento começou na Itália no século XIV." }
        ],
        programming: [
            { english: "JavaScript is a versatile programming language.", portuguese: "JavaScript é uma linguagem de programação versátil." },
            { english: "Python is widely used in machine learning.", portuguese: "Python é amplamente utilizado em aprendizado de máquina." }
        ],
        music: [
            { english: "Beethoven composed nine symphonies.", portuguese: "Beethoven compôs nove sinfonias." },
            { english: "Jazz originated in the United States.", portuguese: "O jazz originou-se nos Estados Unidos." }
        ]
    };

    function loadText(theme) {
        const themeTexts = textThemes[theme];
        const randomText = themeTexts[Math.floor(Math.random() * themeTexts.length)];
        englishText.innerHTML = randomText.english.split("").map(char => `<span>${char}</span>`).join("");
        portugueseText.innerText = randomText.portuguese;
        currentText = randomText.english;
    }

    function resetGame() {
        charIndex = 0;
        mistakes = 0;
        score = 0;
        phase = 1;
        updateUI();
    }

    function updateUI() {
        mistakeTag.textContent = mistakes;
        scoreTag.textContent = score;
        phaseTag.textContent = phase;
    }

    function startGame() {
        const selectedTheme = themeSelect.value;
        loadText(selectedTheme);
        charIndex = 0;
        mistakes = 0;
        updateUI();
        inputField.value = "";
        typingStarted = true;
    }

    // Handle user input (checking against current text)
    inputField.addEventListener('input', () => {
        if (!typingStarted) return;

        const typedChar = inputField.value.charAt(0);  // Get first character from user input
        const currentChar = englishText.querySelectorAll("span")[charIndex];

        if (typedChar === currentChar.textContent) {
            currentChar.classList.add('correct');
            score++;
        } else {
            currentChar.classList.add('incorrect');
            mistakes++;
        }
        
        charIndex++;  // Move to next character
        inputField.value = ""; // Clear the input field for the next character

        if (charIndex === currentText.length) {
            if (mistakes <= maxErrors) {
                alert("Congratulations! Proceeding to the next phase.");
                advanceToNextPhase();
            } else {
                alert("Game Over! Try again.");
                resetGame();
            }
        }

        updateUI();
    });

    function advanceToNextPhase() {
        phase++;
        startGame();
    }

    // Menu interactions
    openMenuBtn.addEventListener('click', () => {
        document.body.classList.add('menu-open');
    });

    closeMenuBtn.addEventListener('click', () => {
        document.body.classList.remove('menu-open');
    });

    restartBtn.addEventListener('click', () => {
        resetGame();
        startGame();
        document.body.classList.remove('menu-open');
    });

    difficultySelect.addEventListener('change', (e) => {
        const difficulty = e.target.value;
        switch (difficulty) {
            case 'easy':
                maxErrors = 10;
                break;
            case 'medium':
                maxErrors = 5;
                break;
            case 'hard':
                maxErrors = 3;
                break;
        }
    });

    // Event listeners for game controls
    continueBtn.addEventListener('click', () => {
        startGame();
    });

    tryAgainBtn.addEventListener('click', () => {
        resetGame();
        startGame();
    });

 // Para evitar que a digitação seja travada ao clicar fora do campo de texto
document.addEventListener('click', (e) => {
    if (e.target !== inputField) { // Só foca no campo quando clicado diretamente
        return;
    }
    });

});




