// ===== GAME DATA =====
const gameData = {
    // Car parts to unlock (6 total)
    carParts: [
        { id: 'body', namePT: 'Corpo do Carro', nameEN: 'Car Body', icon: '🚗' },
        { id: 'wheel1', namePT: 'Roda', nameEN: 'Wheel', icon: '⚫' },
        { id: 'wheel2', namePT: 'Roda', nameEN: 'Wheel', icon: '⚫' },
        { id: 'window', namePT: 'Janela', nameEN: 'Window', icon: '🪟' },
        { id: 'door', namePT: 'Porta', nameEN: 'Door', icon: '🚪' },
        { id: 'lights', namePT: 'Luzes', nameEN: 'Lights', icon: '💡' }
    ],
    
    // Questions organized by themes (3 questions per car part)
    levels: [
        // Level 1: Colors (for body)
        {
            theme: 'Cores / Colors',
            partIndex: 0,
            questions: [
                {
                    image: '🔴',
                    questionPT: 'Que cor é esta?',
                    questionEN: 'What color is this?',
                    answer: 'Vermelho',
                    answerEN: 'Red',
                    options: ['Vermelho', 'Azul', 'Verde', 'Amarelo']
                },
                {
                    image: '🔵',
                    questionPT: 'Que cor é esta?',
                    questionEN: 'What color is this?',
                    answer: 'Azul',
                    answerEN: 'Blue',
                    options: ['Vermelho', 'Azul', 'Verde', 'Amarelo']
                },
                {
                    image: '🟡',
                    questionPT: 'Que cor é esta?',
                    questionEN: 'What color is this?',
                    answer: 'Amarelo',
                    answerEN: 'Yellow',
                    options: ['Laranja', 'Azul', 'Branco', 'Amarelo']
                }
            ]
        },
        // Level 2: Numbers (for wheel 1)
        {
            theme: 'Números / Numbers',
            partIndex: 1,
            questions: [
                {
                    image: '☝️',
                    questionPT: 'Quantos dedos?',
                    questionEN: 'How many fingers?',
                    answer: 'Um',
                    answerEN: 'One',
                    options: ['Um', 'Dois', 'Três', 'Quatro']
                },
                {
                    image: '✌️',
                    questionPT: 'Quantos dedos?',
                    questionEN: 'How many fingers?',
                    answer: 'Dois',
                    answerEN: 'Two',
                    options: ['Um', 'Dois', 'Três', 'Cinco']
                },
                {
                    image: '🖐️',
                    questionPT: 'Quantos dedos?',
                    questionEN: 'How many fingers?',
                    answer: 'Cinco',
                    answerEN: 'Five',
                    options: ['Três', 'Quatro', 'Cinco', 'Seis']
                }
            ]
        },
        // Level 3: Animals (for wheel 2)
        {
            theme: 'Animais / Animals',
            partIndex: 2,
            questions: [
                {
                    image: '🐕',
                    questionPT: 'O que é isto?',
                    questionEN: 'What is this?',
                    answer: 'Cão',
                    answerEN: 'Dog',
                    options: ['Gato', 'Cão', 'Pássaro', 'Peixe']
                },
                {
                    image: '🐱',
                    questionPT: 'O que é isto?',
                    questionEN: 'What is this?',
                    answer: 'Gato',
                    answerEN: 'Cat',
                    options: ['Cão', 'Gato', 'Rato', 'Leão']
                },
                {
                    image: '🐟',
                    questionPT: 'O que é isto?',
                    questionEN: 'What is this?',
                    answer: 'Peixe',
                    answerEN: 'Fish',
                    options: ['Peixe', 'Pato', 'Sapo', 'Baleia']
                }
            ]
        },
        // Level 4: Family (for window)
        {
            theme: 'Família / Family',
            partIndex: 3,
            questions: [
                {
                    image: '👩',
                    questionPT: 'Quem é?',
                    questionEN: 'Who is this?',
                    answer: 'Mãe',
                    answerEN: 'Mom',
                    options: ['Mãe', 'Pai', 'Irmã', 'Avó']
                },
                {
                    image: '👨',
                    questionPT: 'Quem é?',
                    questionEN: 'Who is this?',
                    answer: 'Pai',
                    answerEN: 'Dad',
                    options: ['Mãe', 'Pai', 'Irmão', 'Avô']
                },
                {
                    image: '👦',
                    questionPT: 'Quem é?',
                    questionEN: 'Who is this?',
                    answer: 'Menino',
                    answerEN: 'Boy',
                    options: ['Menina', 'Menino', 'Bebé', 'Homem']
                }
            ]
        },
        // Level 5: Body parts (for door)
        {
            theme: 'Corpo / Body',
            partIndex: 4,
            questions: [
                {
                    image: '👋',
                    questionPT: 'O que é isto?',
                    questionEN: 'What is this?',
                    answer: 'Mão',
                    answerEN: 'Hand',
                    options: ['Pé', 'Mão', 'Braço', 'Dedo']
                },
                {
                    image: '👃',
                    questionPT: 'O que é isto?',
                    questionEN: 'What is this?',
                    answer: 'Nariz',
                    answerEN: 'Nose',
                    options: ['Olho', 'Boca', 'Nariz', 'Orelha']
                },
                {
                    image: '👂',
                    questionPT: 'O que é isto?',
                    questionEN: 'What is this?',
                    answer: 'Orelha',
                    answerEN: 'Ear',
                    options: ['Olho', 'Orelha', 'Nariz', 'Boca']
                }
            ]
        },
        // Level 6: Greetings (for lights)
        {
            theme: 'Saudações / Greetings',
            partIndex: 5,
            questions: [
                {
                    image: '👋😊',
                    questionPT: 'Como dizemos "Hello"?',
                    questionEN: 'How do we say "Hello"?',
                    answer: 'Olá',
                    answerEN: 'Hello',
                    options: ['Adeus', 'Olá', 'Obrigado', 'Sim']
                },
                {
                    image: '👋😢',
                    questionPT: 'Como dizemos "Goodbye"?',
                    questionEN: 'How do we say "Goodbye"?',
                    answer: 'Adeus',
                    answerEN: 'Goodbye',
                    options: ['Olá', 'Bom dia', 'Adeus', 'Não']
                },
                {
                    image: '🙏😊',
                    questionPT: 'Como dizemos "Thank you"?',
                    questionEN: 'How do we say "Thank you"?',
                    answer: 'Obrigado',
                    answerEN: 'Thank you',
                    options: ['Por favor', 'Obrigado', 'Desculpa', 'Olá']
                }
            ]
        }
    ]
};

// ===== GAME STATE =====
let gameState = {
    playerName: '',
    currentLevel: 0,
    currentQuestion: 0,
    partsUnlocked: 0,
    correctInLevel: 0,
    totalStars: 0,
    wordsLearned: []
};

// ===== DOM ELEMENTS =====
const screens = {
    welcome: document.getElementById('welcome-screen'),
    game: document.getElementById('game-screen'),
    celebration: document.getElementById('celebration-screen'),
    certificate: document.getElementById('certificate-screen')
};

// ===== UTILITY FUNCTIONS =====
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

function playSound(soundId) {
    try {
        const sound = document.getElementById(soundId);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(() => {}); // Ignore autoplay errors
        }
    } catch (e) {
        // Sound not available, continue silently
    }
}

// ===== GAME FUNCTIONS =====
function startGame() {
    const nameInput = document.getElementById('player-name');
    gameState.playerName = nameInput.value.trim() || 'Amigo';
    
    // Reset game state
    gameState.currentLevel = 0;
    gameState.currentQuestion = 0;
    gameState.partsUnlocked = 0;
    gameState.correctInLevel = 0;
    gameState.totalStars = 0;
    gameState.wordsLearned = [];
    
    // Reset car parts
    document.querySelectorAll('.car-part').forEach(part => {
        part.classList.remove('unlocked');
    });
    
    // Update player display
    document.getElementById('player-display').textContent = `👋 Olá, ${gameState.playerName}!`;
    
    // Update stars display
    updateStarsDisplay();
    
    // Show game screen
    showScreen('game');
    
    // Load first question
    loadQuestion();
}

function loadQuestion() {
    const level = gameData.levels[gameState.currentLevel];
    const question = level.questions[gameState.currentQuestion];
    
    // Update level badge
    document.getElementById('level-badge').textContent = `${level.theme}`;
    document.getElementById('question-number').textContent = 
        `${gameState.currentQuestion + 1}/${level.questions.length}`;
    
    // Update question content
    document.getElementById('question-image').textContent = question.image;
    document.getElementById('question-text').textContent = question.questionPT;
    document.getElementById('question-hint').textContent = question.questionEN;
    
    // Update progress
    updateProgress();
    
    // Update next part name
    const nextPart = gameData.carParts[gameState.partsUnlocked];
    document.getElementById('next-part-name').textContent = 
        `${nextPart.namePT} (${nextPart.nameEN})`;
    
    // Generate answer buttons
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    const shuffledOptions = shuffleArray(question.options);
    shuffledOptions.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option, question);
        answersContainer.appendChild(btn);
    });
    
    // Update parts count
    document.getElementById('parts-count').textContent = gameState.partsUnlocked;
}

function checkAnswer(selected, question) {
    const buttons = document.querySelectorAll('.answer-btn');
    const isCorrect = selected === question.answer;
    
    // Disable all buttons
    buttons.forEach(btn => {
        btn.onclick = null;
        if (btn.textContent === question.answer) {
            btn.classList.add('correct');
        } else if (btn.textContent === selected && !isCorrect) {
            btn.classList.add('wrong');
        }
    });
    
    if (isCorrect) {
        playSound('sound-correct');
        gameState.correctInLevel++;
        gameState.totalStars++;
        
        // Add word to learned list
        if (!gameState.wordsLearned.find(w => w.pt === question.answer)) {
            gameState.wordsLearned.push({
                pt: question.answer,
                en: question.answerEN
            });
        }
        
        showFeedback(true, question);
    } else {
        playSound('sound-wrong');
        showFeedback(false, question);
    }
    
    updateStarsDisplay();
    
    // Wait and continue
    setTimeout(() => {
        hideFeedback();
        nextQuestion();
    }, 1500);
}

function showFeedback(isCorrect, question) {
    const feedback = document.getElementById('feedback');
    const emoji = document.getElementById('feedback-emoji');
    const text = document.getElementById('feedback-text');
    const word = document.getElementById('feedback-word');
    
    if (isCorrect) {
        const praises = [
            'Muito bem! 🎉',
            'Excelente! ⭐',
            'Boa! 👏',
            'Fantástico! 🌟',
            'Perfeito! 💪'
        ];
        emoji.textContent = '🎉';
        text.textContent = praises[Math.floor(Math.random() * praises.length)];
        word.textContent = `${question.answer} = ${question.answerEN}`;
    } else {
        emoji.textContent = '🤔';
        text.textContent = 'Tenta outra vez! / Try again!';
        word.textContent = `A resposta é: ${question.answer}`;
    }
    
    feedback.classList.remove('hidden');
}

function hideFeedback() {
    document.getElementById('feedback').classList.add('hidden');
}

function nextQuestion() {
    gameState.currentQuestion++;
    
    const level = gameData.levels[gameState.currentLevel];
    
    // Check if level complete
    if (gameState.currentQuestion >= level.questions.length) {
        unlockPart();
        return;
    }
    
    loadQuestion();
}

function unlockPart() {
    const partId = gameData.carParts[gameState.partsUnlocked].id;
    const partElement = document.getElementById(`part-${partId}`);
    
    if (partElement) {
        partElement.classList.add('unlocked');
        playSound('sound-correct');
    }
    
    gameState.partsUnlocked++;
    gameState.currentLevel++;
    gameState.currentQuestion = 0;
    gameState.correctInLevel = 0;
    
    // Update parts count
    document.getElementById('parts-count').textContent = gameState.partsUnlocked;
    
    // Check if game complete
    if (gameState.partsUnlocked >= gameData.carParts.length) {
        setTimeout(() => {
            showCelebration();
        }, 1000);
        return;
    }
    
    // Continue to next level
    setTimeout(() => {
        loadQuestion();
    }, 800);
}

function updateProgress() {
    const level = gameData.levels[gameState.currentLevel];
    const progress = (gameState.currentQuestion / level.questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
}

function updateStarsDisplay() {
    const starsElement = document.getElementById('stars');
    const totalPossible = gameData.levels.reduce((sum, l) => sum + l.questions.length, 0);
    const percentage = gameState.totalStars / totalPossible;
    
    let starsDisplay = '';
    for (let i = 0; i < 5; i++) {
        if (i < Math.ceil(percentage * 5)) {
            starsDisplay += '⭐';
        } else {
            starsDisplay += '☆';
        }
    }
    starsElement.textContent = starsDisplay;
}

function showCelebration() {
    playSound('sound-win');
    showScreen('celebration');
    
    // Update celebration content
    document.getElementById('winner-name').textContent = gameState.playerName;
    document.getElementById('final-stars').textContent = gameState.totalStars;
    document.getElementById('words-learned').textContent = gameState.wordsLearned.length;
    
    // Populate words list
    const wordsList = document.getElementById('words-list');
    wordsList.innerHTML = '';
    gameState.wordsLearned.forEach(word => {
        const chip = document.createElement('span');
        chip.className = 'word-chip';
        chip.textContent = `${word.pt} (${word.en})`;
        wordsList.appendChild(chip);
    });
    
    // Create confetti
    createConfetti();
}

function createConfetti() {
    const container = document.getElementById('confetti');
    container.innerHTML = '';
    
    const colors = ['#FF6B35', '#4ECDC4', '#FFE66D', '#7DCE82', '#FF6B6B', '#9B59B6'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(confetti);
    }
}

function showCertificate() {
    showScreen('certificate');
    
    document.getElementById('cert-name').textContent = gameState.playerName;
    document.getElementById('cert-stars').textContent = gameState.totalStars;
    document.getElementById('cert-words').textContent = gameState.wordsLearned.length;
    
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('cert-date').textContent = today.toLocaleDateString('pt-PT', options);
}

function printCertificate() {
    window.print();
}

function goBack() {
    showScreen('celebration');
}

function playAgain() {
    showScreen('welcome');
}

// ===== KEYBOARD SUPPORT =====
document.getElementById('player-name').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        startGame();
    }
});

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    showScreen('welcome');
});
