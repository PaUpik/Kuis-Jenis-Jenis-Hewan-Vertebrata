// === Konfigurasi URL Web Apps Script ===
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbwkLjIndWyKbb0dYThuhomwPGANPOfhYb4sd2EkETy-mDLOOZMzpxvD0p6pt8AEsAv3YA/exec";

// --- Soal-Soal (tanpa angka depan) ---
let questions = [
    {
        type: "radio",
        question: "Hewan vertebrata adalah hewan yang...",
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
        question: "Contoh hewan yang termasuk kelompok Agnatha adalah...",
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
        question: "Hewan yang bernapas dengan insang saat kecil dan paru-paru saat dewasa adalah...",
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
        question: "Ciri khas hewan kelompok Pisces adalah...",
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
        question: "Mamalia disebut juga hewan menyusui karena...",
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
        question: "Sebutkan dua contoh hewan yang termasuk kelompok reptil!",
        name: "q6"
    },
    {
        type: "text",
        question: "Hewan apakah yang memiliki tubuh ditutupi bulu dan punya sayap?",
        name: "q7"
    },
    {
        type: "text",
        question: "Katak termasuk kelompok apa? Dan di mana katak bertelur?",
        name: "q8"
    },
    {
        type: "text",
        question: "Semua burung bisa terbang. (Benar/Salah)",
        name: "q9"
    },
    {
        type: "text",
        question: "Paus adalah mamalia laut terbesar. (Benar/Salah)",
        name: "q10"
    }
];

// --- Kunci Jawaban ---
const kunciJawaban = {
    q1: "b",
    q2: "b",
    q3: "b",
    q4: "b",
    q5: "c",
    q6: ["ular", "buaya", "kadal", "penyu"],
    q7: ["burung", "aves"],
    q8: ["amfibi", "air", "kolam"],
    q9: "salah",
    q10: "benar"
};

// --- Acak Soal ---
function shuffleArray(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
questions = shuffleArray(questions);

// --- Variabel Quiz ---
let namaSiswa = "";
let currentQuestion = 0;
let userAnswers = {};

// --- Elemen DOM ---
const questionContainer = document.getElementById('question-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const resultDiv = document.getElementById('result');

// --- FORM NAMA LENGKAP ---
document.addEventListener("DOMContentLoaded", function() {
    const mulaiBtn = document.getElementById('mulaiBtn');
    const inputNama = document.getElementById('namaSiswa');
    mulaiBtn.addEventListener("click", function(e) {
        e.preventDefault();
        const nama = inputNama.value.trim();
        if (nama === "") {
            alert("Nama lengkap wajib diisi!");
            inputNama.focus();
            return;
        }
        namaSiswa = nama;
        document.getElementById('form-nama').style.display = "none";
        document.getElementById('quizForm').style.display = "block";
        renderQuestion(currentQuestion);
    });
});

// --- Render Soal ---
function renderQuestion(index) {
    let q = questions[index];
    let html = `<div class="question"><p>${index + 1}. ${q.question}</p>`;
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

    // Navigasi Tombol
    prevBtn.style.display = (index === 0) ? "none" : "inline-block";
    nextBtn.style.display = (index === questions.length - 1) ? "none" : "inline-block";
    submitBtn.style.display = (index === questions.length - 1) ? "inline-block" : "none";

    prevBtn.innerHTML = "&#8592;";
    nextBtn.innerHTML = "&#8594;";
}

// --- Simpan Jawaban ---
function saveAnswer() {
    let q = questions[currentQuestion];
    if (q.type === "radio") {
        const selected = document.querySelector(`input[name="${q.name}"]:checked`);
        if (selected) userAnswers[q.name] = selected.value;
    } else if (q.type === "text") {
        const textVal = document.querySelector(`input[name="${q.name}"]`).value;
        if (textVal !== undefined) userAnswers[q.name] = textVal;
    }
}

// --- Validasi dan Navigasi Soal ---
nextBtn.addEventListener('click', function() {
    let q = questions[currentQuestion];
    let answered = false;
    if (q.type === "radio") {
        answered = !!document.querySelector(`input[name="${q.name}"]:checked`);
    } else if (q.type === "text") {
        let val = document.querySelector(`input[name="${q.name}"]`).value.trim();
        answered = val.length > 0;
    }
    if (!answered) {
        alert("Silakan jawab dulu sebelum ke soal berikutnya!");
        return;
    }
    saveAnswer();
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion(currentQuestion);
    }
});

prevBtn.addEventListener('click', function() {
    saveAnswer();
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion(currentQuestion);
    }
});

// --- Submit & Penilaian ---
document.getElementById('quizForm').onsubmit = function(e) {
    // Validasi WAJIB jawab semua soal
    for (let i = 0; i < questions.length; i++) {
        let q = questions[i];
        if (q.type === "radio") {
            if (!document.querySelector(`input[name="${q.name}"]:checked`)) {
                alert(`Soal nomor ${i+1} belum dijawab!`);
                renderQuestion(i);
                e.preventDefault();
                return;
            }
        } else if (q.type === "text") {
            let val = document.querySelector(`input[name="${q.name}"]`).value.trim();
            if (val.length === 0) {
                alert(`Soal nomor ${i+1} belum dijawab!`);
                renderQuestion(i);
                e.preventDefault();
                return;
            }
        }
    }

    e.preventDefault();
    saveAnswer();

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

    let pesan = `<b>Nama: ${namaSiswa}</b><br>Nilai kamu: <b>${score}/${total}</b><br>`;
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

    // --- KIRIM OTOMATIS KE GURU (Google Apps Script) ---
    fetch(WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama: namaSiswa,
        skor: score,
        jawaban: userAnswers
      })
    })
    .then(r => r.text())
    .then(txt => {
      // Sukses kirim (jika perlu alert)
      // alert('Jawaban kamu sudah dikirim ke guru.');
    })
    .catch(err => {
      // Gagal kirim (jika perlu alert)
      // alert('Gagal mengirim jawaban ke guru!');
    });
};
