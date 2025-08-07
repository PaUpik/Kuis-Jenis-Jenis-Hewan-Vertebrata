// --- Shuffle Utility (Fisher-Yates) ---
function shuffleArray(array) {
    let arr = array.slice(); // copy array
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

let questions = [ /* ...tanpa angka di depan question... */ ];

// ... kunciJawaban seperti biasa ...

questions = shuffleArray(questions);

let currentQuestion = 0;
let userAnswers = {};

const questionContainer = document.getElementById('question-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const resultDiv = document.getElementById('result');

function renderQuestion(index) {
    let q = questions[index];
    let html = `<div class="question"><p>${index + 1}. ${q.question}</p>`;
    // ... (lanjutkan seperti biasa)
    // dst.
}
