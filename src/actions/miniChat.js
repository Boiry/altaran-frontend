export const SET_TAB = "SET_TAB";
export const IS_OPENED = "IS_OPENED";

export const setTab = () => ({
  type: SET_TAB,
});

export const isOpened = (value) => ({
  type: IS_OPENED,
  value, 
});
