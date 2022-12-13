'use strict'


//Nav hover effect
const nav = document.querySelector("nav");
const section1 = document.getElementById('section--1')
const header = document.querySelector('header')
const hamburger =document.querySelector('.hamburger')
const handleHover = function (e,opacity,color) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector('h2');
    link.style.color = color;

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = opacity;
      });
      logo.style.opacity = opacity;
  }
};

// Passing "argument" into handler
nav.addEventListener("mouseover", function(e){
  handleHover(e, 0.5, "#fff");
});
nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1,'#333');
});

//TypeWriter effect
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }
    // If word is complete

    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}
// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

//Smooth Scrolling
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});


//Revealing Sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//Sticky Nav
const navHeight = nav.getBoundingClientRect().height

 const stickyAdd =function(entries){
  const [entry]=entries;
  // nav.classList.add('sticky')
  if(entry.isIntersecting) nav.classList.remove ("sticky");
  else{
  nav.classList.add("sticky");}
 }
 const headerObserver = new IntersectionObserver
 (stickyAdd, { root:null, threshold:0,rootMargin:`-${navHeight}px`,})
  headerObserver.observe(header)
 
  //Lazy loading

  const img = document.querySelectorAll('.lazy-img');

  const lazyloading = function(entries, observer){
    const [entry]=entries
    console.log(entry);
    if(!entry.isIntersecting) return;
      entry.target.classList.remove('lazy-img');
      observer.unobserve(entry.target)
  } 

  const imgLoading = new IntersectionObserver(lazyloading,{root:null,threshold:1})
  img.forEach(img=> 
    imgLoading.observe(img)

    )

    // Hamburger Menu
    // function background(x) {
    //   if (x.matches) {
    //     document.body.style.backgroundColor = "gray";
    //     document.body.style.color = "white";
        
    //     hamburger.style.display='block'
    //     nav.style.display='block'
    //   } else {
    //     document.body.style.backgroundColor = "#292929";
    //     hamburger.style.display='none'
       
    //   }
    // }
    // let x = window.matchMedia("(max-width:500px)");
    // background(x);
    // x.addListener(background);
