'use strict';

///////////////////////////////////////
// Modal window
const nav = document.querySelector(".nav");
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector(".header");
const dotContainer = document.querySelector(".dots");


const openModal = function (e) {
  // e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(el => {
  el.addEventListener("click", openModal)
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// creating and inserting elements
// 1) creating element
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML = `We use cookied for improved functionality
 and analytics <button class="btn btn--close--cookie"> Got it!</button>`
// 2) inserting element

header.before(message); //  -> beforebegin in  >>    >>
header.after(message);  // -> afterend   in    >>    >>
header.prepend(message); // -> afterbegin in insertAdjacentHTML
header.append(message); //  -> beforeend in    >>    >>
// deletin element
 document.querySelector(".btn--close--cookie").addEventListener("click", function() {
  // message.remove(); // best way
  message.parentElement.removeChild(message);
 })
 message.style.backgroundColor = "#370232";

 message.style.height = parseInt(getComputedStyle(message).height) + 20 + "px";

 const btnScrollTol = document.querySelector(".btn--scroll-to");
 const section1 = document.querySelector("#section--1");

 btnScrollTol.addEventListener("click", function(e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // window.scrollTo( + window.pageXOffset, );
  // window.scrollTo({
  //   left: s1coords.left,
  //   top: s1coords.top,
  //   behavior: "smooth"
  // })
  section1.scrollIntoView({behavior: "smooth"});
 })


const h1 = document.querySelector("h1");

const alertH1 = function(e) {
  alert("you are reading h1.");

}


h1.addEventListener("mouseenter", alertH1);
h1.removeEventListener("mouseenter", alertH1);

// setTimeout(() => {
//   h1.removeEventListener("mouseenter", alertH1);
// }, 3000);


// const randomInt = (max, min) => Math.floor(Math.random() * (max-min)) + min;
// const setBackroundColor = function(e) {
//   document.body.style.backgroundColor = `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`
// }

// // document.querySelectorAll(".nav__link").addEventListener("mouseenter", setBackroundColor);


// document.querySelectorAll(".nav__link").forEach(el => {
//   el.addEventListener("click", function(e) {
//     e.preventDefault();
//     const id = el.getAttribute("href")
//     console.log(id);
//     const section = document.querySelector(id);
//     section.scrollIntoView({behavior: "smooth"});
//   })
// })
// EVENT DELEGATION;
document.querySelector(".nav__links").addEventListener("click", function(e) {
  e.preventDefault()
  // MATCHING STRATEGY
  if(e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href")
    console.log(id);
    const section = document.querySelector(id);
    section.scrollIntoView({behavior: "smooth"});
  }
})


const h = document.querySelector("h1");


h.firstElementChild.style.color = "#fff";



document.querySelector(".operations__tab-container").addEventListener("click", function(e) {
  // MATCHING STRATEGY
  if(e.target.classList.contains("operations__tab")) {
    document.querySelectorAll(".operations__tab").forEach(el => el.classList.remove("operations__tab--active"));
    e.target.classList.add("operations__tab--active");

    document.querySelectorAll(".operations__content").forEach(el => el.classList.remove("operations__content--active"));
    document.querySelector(`.operations__content--${e.target.dataset.tab}`).classList.add("operations__content--active");
  }
})


const handleOver = function(e, opacity) {
  if(e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    
    siblings.forEach(el => {
      if(link !== el) {
        el.style.opacity = opacity;
      }

      logo.style.opacity = opacity
    })
  }
}

nav.addEventListener("mouseover", function(e) {
  handleOver(e, 0.5);
});

nav.addEventListener("mouseout", function(e) {
  handleOver(e, 1);

})

// // sticky navigation
// const initCoords = section1.getBoundingClientRect();
// window.addEventListener("scroll", function(e) {
//   console.log(window.scrollY);
//   if(window.scrollY > 600) {
//     document.querySelector(".nav").classList.add("sticky");
//   }
//   else  {
//     nav.classList.remove("sticky");
//   }
// })

// sticky navigation with observer API

const head = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const sticyNav = function(entries) {
  const [entry] = entries;
  if(!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(sticyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})

headerObserver.observe(head);


// reveal section

const allSections = document.querySelectorAll(".section");

const revealSection = function(entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if(!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection,  {
  root: null,
  threshold: 0.15
});

allSections.forEach(function(section)  {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
})


// lazy lodding images

const loadImage = function(entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if(!entry.isIntersecting) return;
  console.log(entry.target.src);
  entry.target.src = entry.target.dataset.src

  entry.target.addEventListener("load", function() {
    entry.target.classList.remove("lazy-img");

  })

  observe.unobserve(entry.target);
  
}

const imageTarget = document.querySelectorAll("img[data-src]");

const imageObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: "200px" 
})

imageTarget.forEach(img => {
  imageObserver.observe(img);
})


// Slider

const sliders = document.querySelectorAll(".slide");

// const slider = document.querySelector(".slider");
// slider.style.transform = "scale(0.5)";
// slider.style.overflow = "visible";



let curSlide = 0;
const maxSlides = sliders.length-1;

// sliders.forEach((el, i) => {
//   el.style.transform= `translateX(${(i) * 100}%)`;
// }

sliders.forEach((el, i) => {
  const html = `<button class="dots__dot" data-slide="${i}"></button>`;
  dotContainer.insertAdjacentHTML("beforeend", html)
})

const dots = document.querySelectorAll(".dots__dot")


const goToSlide = function(slide) {
  dots
  sliders.forEach((el, i) => {
    el.style.transform= `translateX(${(i - slide) * 100}%)`;
  });
}

const nextSlide = function() {
  if(curSlide === maxSlides) curSlide = 0;
  else curSlide++;
  activateDot(curSlide)

  goToSlide(curSlide);
}

const prevSlide = function() {
  if(curSlide === 0) curSlide = maxSlides;
  else curSlide--;
  activateDot(curSlide)
  goToSlide(curSlide);
 
}

const activateDot = function(slideNum) {
  dots.forEach(el => {
    el.classList.remove("dots__dot--active")
    if(el.dataset.slide == slideNum) {
      el.classList.add("dots__dot--active")
    }
})
}

activateDot(0);


dots.forEach(el => {
  el.addEventListener("click", function(e) {
    // dots.forEach(el => el.classList.remove("dots__dot--active"))
    const slideNumber = e.target.dataset.slide;
    activateDot(slideNumber);
    // e.target.classList.add("dots__dot--active");
    // const slideNumber = el.dataset.slide;
    goToSlide(slideNumber);
    
  })

})



goToSlide(0);



const btn_left = document.querySelector(".slider__btn--left")
const btn_right = document.querySelector(".slider__btn--right")

btn_right.addEventListener("click", nextSlide)
btn_left.addEventListener("click", prevSlide)

document.addEventListener("keydown", function(e) {
if(e.key === "ArrowRight") nextSlide();
// SHORT CIRCUITING
 e.key === "ArrowLeft" && prevSlide();
})



// window.addEventListener("beforeunload", function(e) {
//   e.preventDefault();
//   console.log(e);
//   returnValue = ""
// })



const randomInt = (max, min) => Math.floor(Math.random() * (max-min)) + min;
const setBackroundColor = function(e, parentEl) {
  parentEl.style.backgroundColor = `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`
}

// document.querySelectorAll(".nav__link").addEventListener("mouseenter", setBackroundColor);
// document.querySelector(".nav__link").addEventListener("click", function(e) {
//   setBackroundColor(e, this);
//   // e.target is an element on which the click happens
//   // e.currentTarget is an element on which the event attaches
//   console.log(this === e.currentTarget);
//   e.stopPropagation();
// })


// const nv = document.querySelector(".nav");
// nv.addEventListener("click", function(e) {
//   const btn = nav.closest(".nav_link");
//   console.log("+++++++++++++++++++++++++++++++++");
//   console.log(btn);
//   console.log("+++++++++++++++++++++++++++++++++");

//   setBackroundColor(e, this);
// })
