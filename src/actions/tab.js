export const CHANGE_SUBPAGE = "CHANGE_SUBPAGE";

export const changeSubPage = (name, subPage) => ({
  type: CHANGE_SUBPAGE,
  name,
  subPage,
});
