// --- Nama siswa (wajib diisi) ---
let namaSiswa = "";

// Fungsi acak soal
function shuffleArray(arr){ return arr.slice().sort(()=>Math.random()-0.5); }

// Daftar soal
let questions = shuffleArray([
  { type:"radio", question:"Hewan vertebrata adalah hewan yang...", name:"q1", options:["a. Tidak punya tulang belakang","b. Punya tulang belakang","c. Hidup di udara","d. Memiliki cangkang keras"] },
  { type:"radio", question:"Contoh hewan yang termasuk kelompok Agnatha adalah...", name:"q2", options:["a. Kucing dan anjing","b. Lamprey dan hagfish","c. Katak dan salamander","d. Ular dan buaya"] },
  { type:"radio", question:"Hewan yang bernapas dengan insang saat kecil dan paru-paru saat dewasa adalah...", name:"q3", options:["a. Mamalia","b. Amfibi","c. Reptil","d. Aves"] },
  { type:"radio", question:"Ciri khas hewan kelompok Pisces adalah...", name:"q4", options:["a. Memiliki bulu","b. Tubuh bersisik dan licin","c. Bertelur di darat","d. Menyusui anaknya"] },
  { type:"radio", question:"Mamalia disebut juga hewan menyusui karena...", name:"q5", options:["a. Bertelur di air","b. Memiliki sisik","c. Menyusui anaknya","d. Hidup di udara"] },
  { type:"text", question:"Sebutkan dua contoh hewan yang termasuk kelompok reptil!", name:"q6" },
  { type:"text", question:"Hewan apakah yang memiliki tubuh ditutupi bulu dan punya sayap?", name:"q7" },
  { type:"text", question:"Katak termasuk kelompok apa? Dan di mana katak bertelur?", name:"q8" },
  { type:"text", question:"Semua burung bisa terbang. (Benar/Salah)", name:"q9" },
  { type:"text", question:"Paus adalah mamalia laut terbesar. (Benar/Salah)", name:"q10" }
]);

const kunci = {
  q1:"b", q2:"b", q3:"b", q4:"b", q5:"c",
  q6:["ular","buaya","kadal","penyu"],
  q7:["burung","aves"], q8:["amfibi","air","kolam"], q9:"salah", q10:"benar"
};

let current = 0, answers = {};

const container = document.getElementById('question-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const resultDiv = document.getElementById('result');

// Mulai kuis setelah isi nama
document.getElementById('mulaiBtn').onclick = e => {
  e.preventDefault();
  const nm = document.getElementById('namaSiswa').value.trim();
  if (!nm) return alert("Nama lengkap wajib diisi!");
  namaSiswa = nm;
  document.getElementById('form-nama').style.display = "none";
  document.getElementById('quizForm').style.display = "block";
  render(current);
};

function render(i){
  const q = questions[i];
  let html = `<p>${i+1}. ${q.question}</p>`;
  if(q.type==="radio"){
    q.options.forEach(opt=>{
      const val = opt[0].toLowerCase();
      const chk = answers[q.name] === val ? "checked" : "";
      html += `<label><input type="radio" name="${q.name}" value="${val}" ${chk}> ${opt}</label><br>`;
    });
  } else {
    html += `<input type="text" name="${q.name}" value="${answers[q.name]||""}" placeholder="Jawaban">`;
  }
  container.innerHTML = html;
  prevBtn.style.display = i? "inline-block":"none";
  nextBtn.style.display = i<questions.length-1? "inline-block":"none";
  submitBtn.style.display = i===questions.length-1? "inline-block":"none";
}

function save(){
  const q = questions[current];
  const el = q.type==="radio" ? document.querySelector(`input[name="${q.name}"]:checked`) : document.querySelector(`input[name="${q.name}"]`);
  if(el) answers[q.name] = el.value.trim();
}

nextBtn.onclick = ()=>{
  save();
  current++; render(current);
};
prevBtn.onclick = ()=>{
  save();
  current--; render(current);
};

document.getElementById('quizForm').onsubmit = e=>{
  e.preventDefault();
  save();
  for(let i=0;i<questions.length;i++){
    if(!answers[questions[i].name]){
      current=i; render(i);
      return alert(`Soal nomor ${i+1} belum dijawab!`);
    }
  }
  // Hitung skor
  let score=0;
  questions.forEach(q=>{
    const a = (answers[q.name]||"").toLowerCase();
    if(typeof kunci[q.name]==="string"){
      if(a===kunci[q.name]) score++;
    } else {
      let cnt = kunci[q.name].filter(k=>a.includes(k)).length;
      if(cnt>=2) score++;
    }
  });
  const total=questions.length;
  resultDiv.innerHTML = `<b>Nama: ${namaSiswa}</b><br>Nilai: <b>${score}/${total}</b><br>${score===total?"Luar biasa! Semua benar 😎":score>=5?"Lumayan, ayo belajar lagi!":"Yuk, lebih giat belajar!"}`;
  document.getElementById('quizForm').style.display="none";

  // Kirim email otomatis via Apps Script (sudah pakai link Anda)
  fetch("https://script.google.com/macros/s/AKfycbwkLjIndWyKbb0dYThuhomwPGANPOfhYb4sd2EkETy-mDLOOZMzpxvD0p6pt8AEsAv3YA/exec", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ nama:namaSiswa, skor: `${score}/${total}`, jawaban: answers })
  });
};
