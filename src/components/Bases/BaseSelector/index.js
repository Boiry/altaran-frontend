import React, { useEffect, memo } from 'react';

import FakeData from '../fakeData.js';
import './baseSelector.scss';

const BaseSelector = memo(({ handleClick }) => {
  // Extracting datas from object and put it in arrays
  let basesId = [];
  let basesSkin = [];
  Object.entries(FakeData).forEach(
    ([key, value]) => {
      basesId.push(value.id);
      basesSkin.push(value.skin);
    }
  );

  // Making of img components
  const BasesList = () => (
    basesId.map((baseId, index) => {
      const key = baseId;
      return (
        <img key={key} src={require("src/assets/images/"+basesSkin[index]+".png").default} className="base-selector-base" onClick={() => {handleClick(baseId)}} />
      );
    })
  );

  // Effects of hover and click
  useEffect(() => {
    console.log("render");
    const little = "1.5rem", medium = "2.5rem", big = "3.5rem";
    let bases = document.getElementsByClassName("base-selector-base");
    const softDescription = document.getElementsByClassName("soft-description")[0];
    for (let i=0; i<bases.length; i++) {
      if (bases[i].classList.contains("selected-base")) {
        bases[i].style.width = big;
      }
      bases[i].addEventListener("mouseover", () => {mouseOverBase(bases[i])});
      bases[i].addEventListener("mouseout", () => {mouseOutBase(bases[i])});
      bases[i].addEventListener("click", () => {clickOnBase(bases[i])});
    }

    const mouseOverBase = (base) => {
      base.style.width = big;
      const top = base.clientHeight + base.offsetTop + 50;
      const left = base.offsetParent.offsetLeft + 60;
      softDescription.style.top = top+"px";
      softDescription.style.left = left+"px";
      softDescription.style.display = "flow-root";
      for (let i=0; i<bases.length; i++) {
        if (base === document.getElementsByClassName("base-selector-base")[i]) {
          softDescription.querySelector(".selector-base-name").textContent = "Planète " + (i+1);
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
      for (let i=0; i<bases.length; i++) {
        if (bases[i].classList.contains("selected-base")) {
          bases[i].classList.remove("selected-base");
          bases[i].style.width = little;
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
