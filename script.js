const questions = [
    {
        type: "radio",
        question: "1. Hewan vertebrata adalah hewan yang...",
        name: "q1",
        options: [
            "a. Tidak punya tulang belakang",
            "b. Punya tulang belakang",
            "c. Hidup di udara",
            "d. Memiliki cangkang keras"
        ]
    },
    {
        type: "radio",
        question: "2. Contoh hewan yang termasuk kelompok Agnatha adalah...",
        name: "q2",
        options: [
            "a. Kucing dan anjing",
            "b. Lamprey dan hagfish",
            "c. Katak dan salamander",
            "d. Ular dan buaya"
        ]
    },
    {
        type: "radio",
        question: "3. Hewan yang bernapas dengan insang saat kecil dan paru-paru saat dewasa adalah...",
        name: "q3",
        options: [
            "a. Mamalia",
            "b. Amfibi",
            "c. Reptil",
            "d. Aves"
        ]
    },
    {
        type: "radio",
        question: "4. Ciri khas hewan kelompok Pisces adalah...",
        name: "q4",
        options: [
            "a. Memiliki bulu",
            "b. Tubuh bersisik dan licin",
            "c. Bertelur di darat",
            "d. Menyusui anaknya"
        ]
    },
    {
        type: "radio",
        question: "5. Mamalia disebut juga hewan menyusui karena...",
        name: "q5",
        options: [
            "a. Bertelur di air",
            "b. Memiliki sisik",
            "c. Menyusui anaknya",
            "d. Hidup di udara"
        ]
    },
    {
        type: "text",
        question: "6. Sebutkan dua contoh hewan yang termasuk kelompok reptil!",
        name: "q6"
    },
    {
        type: "text",
        question: "7. Hewan apakah yang memiliki tubuh ditutupi bulu dan punya sayap?",
        name: "q7"
    },
    {
        type: "text",
        question: "8. Katak termasuk kelompok apa? Dan di mana katak bertelur?",
        name: "q8"
    },
    {
        type: "text",
        question: "9. Semua burung bisa terbang. (Benar/Salah)",
        name: "q9"
    },
    {
        type: "text",
        question: "10. Paus adalah mamalia laut terbesar. (Benar/Salah)",
        name: "q10"
    }
];

// Kunci jawaban untuk penilaian otomatis
const kunciJawaban = {
    q1: "b",
    q2: "b",
    q3: "b",
    q4: "b",
    q5: "c",
    q6: ["ular", "buaya", "kadal", "penyu"], // minimal dua dari ini
    q7: ["burung", "aves"],
    q8: ["amfibi", "air", "kolam"], // kelompok amfibi, bertelur di air
    q9: "salah",
    q10: "benar"
};

let currentQuestion = 0;
let userAnswers = {};

const questionContainer = document.getElementById('question-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const resultDiv = document.getElementById('result');

function renderQuestion(index) {
    let q = questions[index];
    let html = `<div class="question"><p>${q.question}</p>`;
    if (q.type === "radio") {
        q.options.forEach((option, i) => {
            const val = option[0].toLowerCase();
            const checked = userAnswers[q.name] === val ? 'checked' : '';
            html += `<label><input type="radio" name="${q.name}" value="${val}" ${checked}> ${option}</label><br>`;
        });
    } else if (q.type === "text") {
        const val = userAnswers[q.name] ? userAnswers[q.name] : "";
        html += `<input type="text" name="${q.name}" value="${val}" placeholder="Jawaban">`;
    }
    html += '</div>';
    questionContainer.innerHTML = html;

    // Show/hide navigation buttons
    prevBtn.style.display = index === 0 ? "none" : "inline-block";
    nextBtn.style.display = index === questions.length - 1 ? "none" : "inline-block";
    submitBtn.style.display = index === questions.length - 1 ? "inline-block" : "none";
}

function saveAnswer() {
    let q = questions[currentQuestion];
    if (q.type === "radio") {
        const selected = document.querySelector(`input[name="${q.name}"]:checked`);
        if (selected) userAnswers[q.name] = selected.value;
    } else if (q.type === "text") {
        const textVal = document.querySelector(`input[name="${q.name}"]`).value;
        if (textVal) userAnswers[q.name] = textVal;
    }
}

prevBtn.addEventListener('click', function() {
    saveAnswer();
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion(currentQuestion);
    }
});

nextBtn.addEventListener('click', function() {
    saveAnswer();
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion(currentQuestion);
    }
});

document.getElementById('quizForm').onsubmit = function(e) {
    e.preventDefault();
    saveAnswer();

    // Penilaian otomatis seperti sebelumnya
    let score = 0, total = 10;

    if(userAnswers.q1 === kunciJawaban.q1) score++;
    if(userAnswers.q2 === kunciJawaban.q2) score++;
    if(userAnswers.q3 === kunciJawaban.q3) score++;
    if(userAnswers.q4 === kunciJawaban.q4) score++;
    if(userAnswers.q5 === kunciJawaban.q5) score++;

    let q6 = (userAnswers.q6 || "").toLowerCase();
    let count6 = 0;
    kunciJawaban.q6.forEach(reptil => { if(q6.includes(reptil)) count6++; });
    if(count6 >= 2) score++;

    let q7 = (userAnswers.q7 || "").toLowerCase();
    if(kunciJawaban.q7.some(j => q7.includes(j))) score++;

    let q8 = (userAnswers.q8 || "").toLowerCase();
    if(q8.includes("amfibi") && (q8.includes("air") || q8.includes("kolam"))) score++;

    let q9 = (userAnswers.q9 || "").toLowerCase();
    if(q9 === kunciJawaban.q9) score++;
    let q10 = (userAnswers.q10 || "").toLowerCase();
    if(q10 === kunciJawaban.q10) score++;

    let pesan = `Nilai kamu: <b>${score}/${total}</b><br>`;
    if (score == total) {
        pesan += "Luar biasa! Semua benar 😎";
    } else if (score >= 8) {
        pesan += "Hampir sempurna, mantap!";
    } else if (score >= 5) {
        pesan += "Lumayan, ayo belajar lagi!";
    } else {
        pesan += "Yuk, lebih giat belajar tentang hewan vertebrata!";
    }

    document.getElementById("quizForm").style.display = "none";
    resultDiv.innerHTML = pesan;
};

// Tampilkan soal pertama saat halaman dimuat
renderQuestion(currentQuestion);
