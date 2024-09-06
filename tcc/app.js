// nav toggler 

let navToggler = document.querySelector('.nav-toggler');
let linksContainer = document.querySelector('.links-container');

navToggler.addEventListener('click', () => {
  navToggler.classList.toggle('active');
  linksContainer.classList.toggle('active');
})

// sobre review slider 

let reviews = document.querySelectorAll('.review-wrapper');

let currentReviews = [0, 2]; 

let updateReviewsSlider = (cards) => {

    cards.forEach((card_index) => {
        reviews[card_index].classList.add('active'); 
})
}

setInterval(() => {
    currentReviews.forEach((card_index, i) => {
        reviews[card_index].classList.remove('active');

        currentReviews[i] = card_index >= reviews.length - 1 ? 0 : card_index + 1;
    })

    setTimeout(() => {
        updateReviewsSlider(currentReviews);
    }, 250);

}, 5000);

updateReviewsSlider(currentReviews);


// faq 

let faqs = [...document.querySelectorAll('.faq')];

faqs.map(faq => {
    let ques = faq.querySelector('.question-box');

    ques.addEventListener('click', () => {
        faq.classList.toggle('active');
    })
})

// desconto 

let dishSlider = document.querySelector('.dish-slide');

let rotationVal = 0; 

setInterval(() => {
   
    rotationVal += 120;

    dishSlider.style.transform = `translateY(-50%) rotate(${rotationVal}deg)`;

}, 3000)

// go to top button 
let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let progressValue = document.getElementById("progress-value");
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  if (pos > 100) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }
  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
  scrollProgress.style.background = `conic-gradient(#03cc65 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// loader 
function loader() {
  document.querySelector(".loader-container").classList.add("fade-out");
}

function fadeOut() {
  setInterval(loader, 3000);
}

window.onload = fadeOut;

// cookies 
var msgCookies = document.getElementById("cookies-msg")

function aceito() {
  localStorage.lgpd = "sim"
  msgCookies.classList.remove("mostrar")
}

if (localStorage.lgpd == "sim") {
  msgCookies.classList.remove("mostrar")
} else {
  msgCookies.classList.add("mostrar")
}

// POP-UP 
// Obtém o popup
var popup = document.getElementById("contactPopup");

// Obtém o botão que abre o popup
var btn = document.querySelector(".btn-contact");

// Obtém o <span> que fecha o popup
var span = document.getElementsByClassName("close")[0];

// Quando o usuário clicar no botão, abre o popup 
btn.onclick = function() {
    popup.style.display = "block";
}

// Quando o usuário clicar no <span> (x), fecha o popup
span.onclick = function() {
    popup.style.display = "none";
}

// Quando o usuário clicar fora do popup, fecha o popup
window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}

AOS.init(); 
