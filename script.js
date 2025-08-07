// --- Nama siswa (harus isi dulu) ---
let namaSiswa = "";

// --- Fungsi Acak Array ---
function shuffleArray(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Daftar soal (tanpa angka di depan)
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
    // ...(lanjutkan hingga q10 sesuai kode sebelumnya)
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

// Kunci jawaban
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

questions = shuffleArray(questions);

let currentQuestion = 0;
let userAnswers = {};

const questionContainer = document.getElementById('question-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const resultDiv = document.getElementById('result');
const downloadBtn = document.getElementById('downloadBtn');
const showGuruLoginBtn = document.getElementById('showGuruLoginBtn');
const guruLoginForm = document.getElementById('guru-login-form');
const guruCodeInput = document.getElementById('guruCode');
const guruLoginBtn = document.getElementById('guruLoginBtn');
const guruLoginWrong = document.getElementById('guruLoginWrong');

const KODE_GURU = "adminkuis2024";

// FORM NAMA LENGKAP
document.addEventListener("DOMContentLoaded", function() {
    const mulaiBtn = document.getElementById('mulaiBtn');
    const inputNama = document.getElementById('namaSiswa');
    if (mulaiBtn && inputNama) {
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
    }
});

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

    if (index === 0) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "inline-block";
        submitBtn.style.display = "none";
    } else if (index === questions.length - 1) {
        prevBtn.style.display = "inline-block";
        nextBtn.style.display = "none";
        submitBtn.style.display = "inline-block";
    } else {
        prevBtn.style.display = "inline-block";
        nextBtn.style.display = "inline-block";
        submitBtn.style.display = "none";
    }
    prevBtn.innerHTML = "&#8592;";
    nextBtn.innerHTML = "&#8594;";
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

document.getElementById('quizForm').onsubmit = function(e) {
    saveAnswer();
    for (let i = 0; i < questions.length; i++) {
        let q = questions[i];
        if (!userAnswers[q.name] || userAnswers[q.name].toString().trim() === "") {
            alert(`Soal nomor ${i+1} belum dijawab!`);
            currentQuestion = i;
            renderQuestion(currentQuestion);
            e.preventDefault();
            return;
        }
    }
    e.preventDefault();

    // Hitung skor
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

    // --- Simpan hasil siswa ke localStorage ---
    let dataSiswa = {
        nama: namaSiswa,
        skor: score,
        total: total,
        waktu: new Date().toLocaleString(),
        jawaban: {}
    };
    questions.forEach(q => {
        dataSiswa.jawaban[q.name] = userAnswers[q.name] || "";
    });
    let rekap = [];
    try {
        rekap = JSON.parse(localStorage.getItem('rekapKuisSiswa') || "[]");
    } catch(e) { rekap = []; }
    // Cegah data double untuk nama sama (replace)
    let idx = rekap.findIndex(d => d.nama.toLowerCase() === namaSiswa.toLowerCase());
    if (idx >= 0) rekap[idx] = dataSiswa;
    else rekap.push(dataSiswa);
    localStorage.setItem('rekapKuisSiswa', JSON.stringify(rekap));

    // Munculkan tombol login guru
    if (showGuruLoginBtn) showGuruLoginBtn.style.display = "block";
    if (downloadBtn) downloadBtn.style.display = "none";
    if (guruLoginForm) guruLoginForm.style.display = "none";
};

// --- LOGIN GURU ---
if (showGuruLoginBtn && guruLoginForm && guruLoginBtn && guruCodeInput) {
    showGuruLoginBtn.onclick = function() {
        guruLoginForm.style.display = "block";
        guruLoginWrong.style.display = "none";
        guruCodeInput.value = "";
        guruCodeInput.focus();
    };
    guruLoginBtn.onclick = function() {
        if (guruCodeInput.value === KODE_GURU) {
            guruLoginForm.style.display = "none";
            showGuruLoginBtn.style.display = "none";
            downloadBtn.style.display = "block";
            guruLoginWrong.style.display = "none";
        } else {
            guruLoginWrong.style.display = "inline";
            guruCodeInput.value = "";
            guruCodeInput.focus();
        }
    };
}

// --- FUNGSI EKSPOR CSV SEMUA JAWABAN DI LOCAL STORAGE ---
function downloadCSV() {
    let rekap = [];
    try { rekap = JSON.parse(localStorage.getItem('rekapKuisSiswa') || "[]"); } catch(e) { rekap = []; }
    if (!rekap.length) {
        alert("Belum ada data siswa tersimpan.");
        return;
    }
    let header = ["Nama","Skor","Total","Waktu"];
    questions.forEach((q,i) => header.push(`Soal${i+1}: ${q.question}`));
    let lines = [header];

    rekap.forEach(data => {
        let row = [data.nama, data.skor, data.total, data.waktu];
        questions.forEach(q => row.push(data.jawaban[q.name] || ""));
        lines.push(row);
    });

    let csvContent = lines.map(row => row.map(item => `"${item}"`).join(",")).join("\r\n");
    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    let link = document.createElement("a");
    let filename = "rekap-kuis-vertebrata-semua-siswa.csv";
    if (navigator.msSaveBlob) { navigator.msSaveBlob(blob, filename); }
    else {
        let url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadCSV);
}
