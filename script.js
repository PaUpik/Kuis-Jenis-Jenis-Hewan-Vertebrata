// Kirim data ke Google Apps Script untuk email otomatis
fetch("PASTE_URL_APPS_SCRIPT_ANDA_DI_SINI", {
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
  // Optional: tampilkan info sukses kirim email
  // alert('Jawaban kamu sudah terkirim ke guru.');
})
.catch(err => {
  // Optional: tampilkan info gagal
  // alert('Gagal mengirim jawaban ke guru!');
});
