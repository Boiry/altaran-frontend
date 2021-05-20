import Background from '../../assets/images/background.jpg';

let lock1, lock2, lock3, lock4, lock5, lock6, lock7, lock8, lock9 = null;
let menuLines, button1, button2, button3, button4 = null;
let title, baseline, article = null;

const findElements = function() {
  lock1 = document.getElementsByClassName("lock1")[0].style;
  lock2 = document.getElementsByClassName("lock2")[0].style;
  lock3 = document.getElementsByClassName("lock3")[0].style;
  lock4 = document.getElementsByClassName("lock4")[0].style;
  lock5 = document.getElementsByClassName("lock5")[0].style;
  lock6 = document.getElementsByClassName("lock6")[0].style;
  lock7 = document.getElementsByClassName("lock7")[0].style;
  lock8 = document.getElementsByClassName("lock8")[0].style;
  lock9 = document.getElementsByClassName("lock9")[0].style;
  menuLines = document.getElementsByClassName("menu-lines")[0].style;
  button1 = document.getElementsByClassName("button1")[0].style;
  button2 = document.getElementsByClassName("button2")[0].style;
  button3 = document.getElementsByClassName("button3")[0].style;
  button4 = document.getElementsByClassName("button4")[0].style;
  title = document.getElementsByClassName("title")[0].style;
  baseline = document.getElementsByClassName("baseline")[0].style;
  article = document.getElementsByClassName("article")[0].style;
};

// FIRST VISIT ANIMATION
export const firstAnimation = function () {
  findElements();
  setTimeout(() => {
    lock9.visibility = "visible";
  }, 100);

  setTimeout(() => {
    lock9.visibility = "hidden";
  }, 500);

  setTimeout(() => {
    lock9.visibility = "visible";
    lock9.animation = "fadein 0.2s linear 1";
  }, 1000);

  setTimeout(() => {
    lock9.animation = "fadeout 0.2s linear 1";
  }, 1400);

  setTimeout(() => {
    lock9.visibility = "hidden";
  }, 1600);

  setTimeout(() => {
    lock9.visibility = "visible";
  }, 2500);

  setTimeout(() => {
    lock3.visibility = "visible";
    lock3.animation = "spin 7.5s linear infinite";
  }, 3000);

  setTimeout(() => {
    lock7.visibility = "visible";
  }, 3400);

  setTimeout(() => {
    lock4.visibility = "visible";
    lock5.visibility = "visible";
  }, 3700);

  setTimeout(() => {
    lock2.visibility = "visible";
  }, 4000);

  setTimeout(() => {
    lock6.visibility = "visible";
    lock6.animation = "spin 1s linear infinite";
    lock4.animation = "spin 5s linear infinite";
    lock5.animation = "counterspin 5s linear infinite";
  }, 4300);

  setTimeout(() => {
    lock1.visibility = "visible";
    lock1.animation = "spin 10s linear infinite";
    lock2.animation = "counterspin 10s linear infinite";
    lock7.animation = "counterspin 20s linear infinite";
  }, 4500);
  
  setTimeout(() => {
    lock2.animationPlayState = "paused";
  }, 5750);

  setTimeout(() => {
    lock1.animationPlayState = "paused";
    lock6.animation = "spin 2s linear infinite";
  }, 5800);

  setTimeout(() => {
    lock4.animationPlayState = "paused";
    lock6.animation = "spin 3s linear infinite";
  }, 6180);

  setTimeout(() => {
    lock3.animationPlayState = "paused";
    lock6.animation = "spin 4s linear infinite";
  }, 6700);

  setTimeout(() => {
    lock5.animationPlayState = "paused";
  }, 6800);

  setTimeout(() => {
    lock7.animationPlayState = "paused";
    lock6.animation = "spin 5s linear infinite";
  }, 6900);

  setTimeout(() => {
    lock6.animationPlayState = "paused";
    lock8.visibility = "visible";
  }, 7200);

  setTimeout(() => {
    for (let i=1; i<10; i++) {
      eval("lock"+i).animation = "spin .1s linear 1";
      eval("lock"+i).visibility = "hidden";
    };
  }, 7250);

  setTimeout(() => {
      lock8.visibility = "visible";
  }, 7400);

  setTimeout(() => {
    lock8.visibility = "hidden";
  }, 7500);

  setTimeout(() => {
    lock8.visibility = "visible";
}, 7600);

setTimeout(() => {
  lock8.visibility = "hidden";
}, 7700);

  setTimeout(() => {
    for (let i=1; i<10; i++) {
      eval("lock"+i).visibility = "visible";
    };
  }, 7800);

  setTimeout(() => {
    for (let i=1; i<10; i++) {
      eval("lock"+i).animation = "lockShrink 3s ease-in-out 1";
    };
    document.body.style.animation = "changeBackground 3s linear 1";
  }, 7900);

  setTimeout(() => {
    for (let i=1; i<10; i++) {
      eval("lock"+i).width = "15rem";
      eval("lock"+i).height = "15rem";
      eval("lock"+i).top = "1rem";
      eval("lock"+i).left = "1rem";
    };
  }, 8000);
  setTimeout(() => {
    secondAnimation();
  }, 10900);
};

// SECOND ANIMATION
export const secondAnimation = function () {
  document.body.style.background = "#022b55";
  findElements();
  document.body.style.backgroundImage = "url('" + Background + "')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundAttachment = "fixed";
  for (let i=1; i<10; i++) {
    eval("lock"+i).width = "15rem";
    eval("lock"+i).height = "15rem";
    eval("lock"+i).left = "1rem"; 
    eval("lock"+i).top = "1rem"; 
  };
  lock9.visibility = "visible";
  setTimeout(() => {
    lock8.visibility = "visible";
  }, 50);
  setTimeout(() => {
    lock6.visibility = "visible";
  }, 100);
  setTimeout(() => {
    lock5.visibility = "visible";
  }, 150);
  setTimeout(() => {
    lock4.visibility = "visible";
  }, 200);
  setTimeout(() => {
    lock7.visibility = "visible";
  }, 250);
  setTimeout(() => {
    lock1.visibility = "visible";
  }, 300);
  setTimeout(() => {
    lock2.visibility = "visible";
  }, 350);
  setTimeout(() => {
    lock3.visibility = "visible";
  }, 400);
  setTimeout(() => {
    menuLines.visibility = "visible";
  }, 450);
  setTimeout(() => {
    button1.visibility = "visible";
  }, 500);
  setTimeout(() => {
    button2.visibility = "visible";
  }, 550);
  setTimeout(() => {
    button3.visibility = "visible";
  }, 600);
  setTimeout(() => {
    button4.visibility = "visible";
  }, 650);
  setTimeout(() => {
    title.visibility = "visible";
  }, 700);
  setTimeout(() => {
    baseline.visibility = "visible";
  }, 750);
  setTimeout(() => {
    article.visibility = "visible";
    article.animation = "fadein .2s linear 1";
  }, 800);
};

// BUTTON 1 ANIMATION
export const button1Animation = function () {
  findElements();
  buttonsAnimation();
  lock1.animation = "spin 3s linear 1";
  lock2.animation = "counterspin 2.5s linear 1";
  lock3.animation = "spin 4s linear 1";
  lock6.animation = "spin 1s linear 1";
  setTimeout(() => {
    lock1.animationPlayState = "paused";
    lock2.animationPlayState = "paused";
    lock3.animationPlayState = "paused";
    lock6.animationPlayState = "paused";
  }, 500);
  setTimeout(() => {
    lock1.animationPlayState = "running";
    lock2.animationPlayState = "running";
    lock3.animationPlayState = "running";
    lock6.animationPlayState = "running";
  }, 2000);
};

// BUTTON 2 ANIMATION
export const button2Animation = function () {
  findElements();
  buttonsAnimation();
  lock2.animation = "counterspin 2.5s linear 1";
  lock4.animation = "counterspin 2.5s linear 1";
  lock5.animation = "spin 3s linear 1";
  lock6.animation = "spin 1s linear 1";
  lock7.animation = "spin 4s linear 1";
  setTimeout(() => {
    lock2.animationPlayState = "paused";
    lock4.animationPlayState = "paused";
    lock5.animationPlayState = "paused";
    lock6.animationPlayState = "paused";
    lock7.animationPlayState = "paused";
  }, 500);
  setTimeout(() => {
    lock2.animationPlayState = "running";
    lock4.animationPlayState = "running";
    lock5.animationPlayState = "running";
    lock6.animationPlayState = "running";
    lock7.animationPlayState = "running";
  }, 2000);
};

// BUTTON 3 ANIMATION
export const button3Animation = function () {
  findElements();
  buttonsAnimation();
  lock2.animation = "spin 3s linear 1";
  lock3.animation = "counterspin 2s linear 1";
  lock6.animation = "spin 0.5s linear 1";
  lock8.animation = "counterspin 2.5s linear 1";
  setTimeout(() => {
    lock2.animationPlayState = "paused";
    lock3.animationPlayState = "paused";
    lock6.animationPlayState = "paused";
    lock8.animationPlayState = "paused";
  }, 500);
  setTimeout(() => {
    lock2.animationPlayState = "running";
    lock3.animationPlayState = "running";
    lock6.animationPlayState = "running";
    lock8.animationPlayState = "running";
  }, 2000);
};

// BUTTON 4 ANIMATION
export const button4Animation = function () {
  findElements();
  buttonsAnimation();
  lock2.animation = "counterspin 2s linear 1";
  lock3.animation = "spin 1s linear 1";
  lock4.animation = "counterspin 2.5s linear 1";
  lock6.animation = "spin 1s linear 1";
  lock7.animation = "spin 3s linear 1";
  setTimeout(() => {
    lock2.animationPlayState = "paused";
    lock3.animationPlayState = "paused";
    lock4.animationPlayState = "paused";
    lock6.animationPlayState = "paused";
    lock7.animationPlayState = "paused";
  }, 500);
  setTimeout(() => {
    lock2.animationPlayState = "running";
    lock3.animationPlayState = "running";
    lock4.animationPlayState = "running";
    lock6.animationPlayState = "running";
    lock7.animationPlayState = "running";
  }, 2000);
};

// UTILITIES FOR BUTTON ANIMATION
const buttonsAnimation = function () {
  setTimeout(() => {
    lock9.visibility = "hidden";
  }, 500);
  setTimeout(() => {
    lock9.visibility = "visible";
  }, 700);
  setTimeout(() => {
    lock9.visibility = "hidden";
  }, 900);
  setTimeout(() => {
    lock9.visibility = "visible";
  }, 1100);
  setTimeout(() => {
    lock1.animation = "none";
    lock2.animation = "none";
    lock3.animation = "none";
    lock4.animation = "none";
    lock5.animation = "none";
    lock6.animation = "none";
    lock7.animation = "none";
    lock8.animation = "none";
  }, 6000);
}

// Last animation when leaving Home
export const lastAnimation = function () {
  document.getElementsByClassName("page-opacity")[0].style.display = "block";
  document.getElementsByClassName("page-opacity")[0].style.animation = "fadein 1s linear 1";
  setTimeout(() => {
    document.getElementsByClassName("navigation")[0].style.display = "none";
    document.getElementsByClassName("header")[0].style.display = "none";
    document.getElementsByClassName("article")[0].style.display = "none";
    document.body.style.background = "black";

  }, 1000);
}
