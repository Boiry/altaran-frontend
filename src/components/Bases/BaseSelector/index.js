import React, { useEffect, memo } from 'react';

import './baseSelector.scss';

const BaseSelector = memo(({ bases, handleClick }) => {
  // Formating data
  let basesArray = [];
  for (const [key, value] of Object.entries(bases)) {
      basesArray.push(key);
  }

  // Create the img elements
  const BasesList = () => (
    basesArray.map((base) => (
      <img key={`selector${base}`} src={require("src/assets/images/planet1.png").default} className="base-selector-base" onClick={() => {handleClick(base)}} />
    ))
  )

  // Effects of hover and click
  useEffect(() => {
    const little = "1.5rem", medium = "2.5rem", big = "3.5rem";
    let basesImg = document.getElementsByClassName("base-selector-base");
    const softDescription = document.getElementsByClassName("soft-description")[0];
    for (let i=0; i<basesImg.length; i++) {
      if (basesImg[i].classList.contains("selected-base")) {
        basesImg[i].style.width = big;
      }
      basesImg[i].addEventListener("mouseover", () => {mouseOverBase(basesImg[i])});
      basesImg[i].addEventListener("mouseout", () => {mouseOutBase(basesImg[i])});
      basesImg[i].addEventListener("click", () => {clickOnBase(basesImg[i])});
    }

    const mouseOverBase = (base) => {
      base.style.width = big;
      const top = base.clientHeight + base.offsetTop + 50;
      const left = base.offsetParent.offsetLeft + 60;
      softDescription.style.top = top+"px";
      softDescription.style.left = left+"px";
      softDescription.style.display = "flow-root";
      for (let i=0; i<basesImg.length; i++) {
        if (base === document.getElementsByClassName("base-selector-base")[i]) {
          softDescription.querySelector(".selector-base-name").textContent = bases[`base${i+1}`].name;
          softDescription.querySelector(".selector-base-coordinates").textContent = "[Coordonnées]";
        }
      }
      const previousElement = base.previousElementSibling;
      if (previousElement !== null && previousElement.className === "base-selector-base") {
        previousElement.style.width = medium;
      }
      const nextElement = base.nextElementSibling;
      if (nextElement !== null && nextElement.className === "base-selector-base") {
      nextElement.style.width = medium;
      }
    };

    const mouseOutBase = (base) => {
      if (!base.classList.contains("selected-base")) {
        base.style.width = little;
      }
      softDescription.style.display = "none";
      const previousElement = base.previousElementSibling;
      if (previousElement !== null && previousElement.className === "base-selector-base") {
        previousElement.style.width = little;
      }
      const nextElement = base.nextElementSibling;
      if (nextElement !== null && nextElement.className === "base-selector-base") {
        nextElement.style.width = little;
      }
    };

    const clickOnBase = (base) => {
      for (let i=0; i<basesImg.length; i++) {
        if (basesImg[i].classList.contains("selected-base")) {
          basesImg[i].classList.remove("selected-base");
          basesImg[i].style.width = little;
        }
      }
      base.classList.add("selected-base");
      base.style.width = big;
    };
  });

  return (
    <BasesList />
  )
});

export default BaseSelector;
