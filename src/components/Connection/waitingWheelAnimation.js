let wheelRef, interval;

const animation = () => {
  wheelRef.style.transform = "rotate(0deg)";
  setTimeout(() => {
    wheelRef.style.transform = "rotate(45deg)";
  }, 100);
  setTimeout(() => {
    wheelRef.style.transform = "rotate(90deg)";
  }, 200);
  setTimeout(() => {
    wheelRef.style.transform = "rotate(135deg)";
  }, 300);
  setTimeout(() => {
    wheelRef.style.transform = "rotate(180deg)";
  }, 400);
  setTimeout(() => {
    wheelRef.style.transform = "rotate(225deg)";
  }, 500);
  setTimeout(() => {
    wheelRef.style.transform = "rotate(270deg)";
  }, 600);
  setTimeout(() => {
    wheelRef.style.transform = "rotate(315deg)";
  }, 700);
};

export const startAnimation = (ref) => {
  wheelRef = ref;
  animation();
  interval = setInterval(animation, 800);
};

export const stopAnimation = () => {
  clearInterval(interval);
};
