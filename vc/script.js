let
  quoteContent = document.querySelector(".quote-content p"),
  quoteAuthor = document.querySelector(".quote-content span"),
  quoteBtn = document.querySelector(".quote-btn"),
  readBtn = document.querySelector(".read"),
  twitterBtn = document.querySelector(".twitter"),
  copyBtn = document.querySelector(".copy"),
  vc = document.querySelector(".vc");
  
let utterance = new SpeechSynthesisUtterance();

function checkRefresh() {
  if (document.refreshForm.visited.value == "") {
    document.refreshForm.visited.value = "1";
    window.speechSynthesis.cancel(utterance);
  }
}


function quoteG() {

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel(utterance);
    readBtn.classList.remove("reading");
    readBtn.innerHTML = `<i class="fa-solid fa-microphone"></i>`;
  }

  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "تحميل...";


  var r = Math.floor(Math.random() * 3777);
  fetch(`https://datasets-server.huggingface.co/rows?dataset=HeshamHaroon%2Farabic-quotes&config=default&split=train&offset=${r}&length=1`).then(res => res.json()).then(result => {
    quoteContent.innerText = result.rows[0].row.quote;
    quoteAuthor.innerText = `- ${result.rows[0].row.author}`;
    quoteBtn.classList.remove("loading");
    quoteBtn.innerText = "إقتباس جديد";
  });
}


readBtn.addEventListener("click", () => {

  utterance.rate = .9;
  utterance.lang = 'ar';
  utterance.text = `${quoteContent.innerText}`;

  if (!window.speechSynthesis.speaking) {
    readBtn.innerHTML = `<i class="fa-solid fa-spinner"></i>`;
    readBtn.classList.add("loading");

    utterance.addEventListener("start", () => {
      readBtn.innerHTML = `<i class="fa-solid fa-microphone-lines"></i>`;
      readBtn.classList.remove("loading");
      readBtn.classList.add("reading");

    });

    utterance.addEventListener("end", () => {
      readBtn.innerHTML = `<i class="fa-solid fa-microphone"></i>`;
      readBtn.classList.remove("reading");
    });
    window.speechSynthesis.speak(utterance);
  } else {
    window.speechSynthesis.cancel(utterance);
    readBtn.classList.remove("reading");
    readBtn.innerHTML = `<i class="fa-solid fa-microphone"></i>`;

  }

});


copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteContent.innerText);
  copyBtn.innerHTML = `<i class="fa-solid fa-check"></i>`
  copyBtn.classList.add("reading");
  setTimeout(() => {
    copyBtn.classList.remove("reading");
    copyBtn.innerHTML = `<i class="fa-solid fa-copy"></i>`;
  }, 800);
});

twitterBtn.addEventListener("click", () => {
  let urlTwitter = `https://x.com/intent/tweet?url=${quoteContent.innerText} ${quoteAuthor.innerText}`;
  window.open(urlTwitter, "_blank");
});

quoteBtn.addEventListener("click", quoteG);



fetch('https://quotes-ar-tdly.onrender.com/api') // Dynamic request with URL parameter
.then(res => res.json())
.then(data => {
  vc.textContent = data.pageviews; 
});
