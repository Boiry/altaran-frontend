export const FETCH_POLITICS = "FETCH_POLITICS";
export const SAVE_POLITICS = "SAVE_POLITICS";

export const fetchPolitics = () => ({
  type: FETCH_POLITICS,
});

export const savePolitics = (politics) => ({
  type: SAVE_POLITICS,
  politics,
})
