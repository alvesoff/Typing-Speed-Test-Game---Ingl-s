// Array de objetos contendo as histórias e palavras para cada tema
const data = {
    history: [
        { en: "In a small village, there lived a young woman named Clara, known for her curiosity. One day, she found an old map in the attic of her house, which showed the way to a lost treasure in the Enchanted Forest. Determined to find him, Clara prepared herself and set out on her journey. In the forest, he encountered magical creatures a", pt: "Em uma pequena vila, vivia uma jovem chamada Clara, conhecida por sua curiosidade. Um dia, ela encontrou um mapa antigo no sótão de sua casa, que mostrava o caminho para um tesouro perdido na Floresta Encantada. Determinada a encontrá-lo, Clara se preparou e partiu em sua jornada. Na floresta,." },
        { en: "In the year 1492, Columbus sailed the ocean blue...", pt: "No ano de 1492, Colombo navegou pelo oceano azul..." },
        { en: "The Roman Empire was one of the most powerful civilizations...", pt: "O Império Romano foi uma das civilizações mais poderosas..." }
    ],
    programming: [
        { en: "JavaScript is a versatile programming language...", pt: "JavaScript é uma linguagem de programação versátil..." },
        { en: "Python is known for its readability and simplicity...", pt: "Python é conhecido por sua legibilidade e simplicidade..." },
        { en: "HTML stands for HyperText Markup Language...", pt: "HTML significa Linguagem de Marcação de Hipertexto..." }
    ],
    music: [
        { en: "The Beatles were an English rock band formed in Liverpool...", pt: "Os Beatles foram uma banda de rock inglesa formada em Liverpool..." },
        { en: "Classical music has a long and rich history...", pt: "A música clássica tem uma longa e rica história..." },
        { en: "Jazz is a music genre that originated in the African-American communities...", pt: "O jazz é um gênero musical que se originou nas comunidades afro-americanas..." }
    ]
};

// Seleciona elementos do DOM
const inputField = document.querySelector('.input-field');
const typingText = document.querySelector('.typing-text .english-text p');
const translationText = document.querySelector('.translation-text p');
const mistakeTag = document.querySelector('.mistake span');
const scoreTag = document.querySelector('.score span');
const tryAgainBtn = document.querySelector('.try-again-btn');
const continueBtn = document.querySelector('.continue-btn');
const themeSelect = document.querySelector('#theme-select');

// Variáveis para armazenar o estado do jogo
let currentText = "";
let currentTranslation = "";
let currentIndex = 0;
let mistakes = 0;
let score = 0;
let selectedTheme = "history";
let phase = 1;  // Fase inicial

// Função para iniciar o jogo com um tema específico
function startGame() {
    // Seleciona uma história aleatória do tema escolhido
    const selectedText = data[selectedTheme][Math.floor(Math.random() * data[selectedTheme].length)];
    currentText = selectedText.en;
    currentTranslation = selectedText.pt;
    typingText.innerHTML = ""; // Limpa o texto anterior
    translationText.innerHTML = currentTranslation; // Exibe a tradução
    currentText.split("").forEach(char => {
        let span = `<span>${char}</span>`;
        typingText.innerHTML += span; // Adiciona os caracteres novamente
    });

    inputField.value = ""; // Limpa o campo de entrada
    inputField.focus(); // Foca no campo de entrada
    currentIndex = 0; // Reseta o índice de digitação
    updateScore(); // Atualiza o score
}

// Função para atualizar o score e os erros
function updateScore() {
    mistakeTag.innerText = mistakes;
    scoreTag.innerText = score;
}

// Função para avançar automaticamente para a próxima fase
function advanceToNextPhase() {
    // Incrementa a fase
    phase++;
    console.log(`Fase: ${phase}`);
    
    // Chama a função para carregar um novo texto, mas mantendo o score e erros
    startGame();
}

// Evento de entrada no campo de texto
inputField.addEventListener('input', () => {
    let typedChar = inputField.value.split("")[currentIndex];
    let currentChar = currentText[currentIndex];
    let spanChar = typingText.querySelectorAll('span')[currentIndex];

    if (typedChar == null) { // Se o caractere foi deletado
        currentIndex--;
        if (spanChar.classList.contains('incorrect')) {
            mistakes--;
        }
        spanChar.classList.remove('correct', 'incorrect');
    } else {
        if (typedChar === currentChar) {
            spanChar.classList.add('correct');
            score++;
        } else {
            spanChar.classList.add('incorrect');
            mistakes++;
        }
        currentIndex++;
    }

    updateScore();

    // Se o texto foi totalmente digitado, avança automaticamente
    if (currentIndex === currentText.length) {
        setTimeout(() => {
            advanceToNextPhase(); // Avança para a próxima fase automaticamente
        }, 500); // Delay de 500ms para dar tempo ao usuário de ver o progresso
    }
});

// Evento de clique no botão "Try Again" - Reseta o jogo
tryAgainBtn.addEventListener('click', () => {
    mistakes = 0;
    score = 0;
    phase = 1; // Reseta a fase para 1
    startGame(); // Reinicia o jogo completamente
});

// Evento de clique no botão "Continue" - Chama a função continueGame
continueBtn.addEventListener('click', () => {
    advanceToNextPhase();  // Avança para a próxima fase, mantendo o score
});

// Inicia o jogo com o tema "history" ao carregar a página
window.onload = () => {
    startGame();
};

// Para evitar que a digitação seja travada ao clicar fora do campo de texto
document.addEventListener('click', (e) => {
    if (e.target !== inputField) { // Só foca no campo quando clicado diretamente
        return;
    }
});
