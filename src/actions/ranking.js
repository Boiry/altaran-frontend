export const FETCH_RANKING = "FETCH_RANKING";
export const SAVE_RANKING = "SAVE_RANKING";
export const FETCH_PLAYERS = "FETCH_PLAYERS";
export const SAVE_PLAYERS = "SAVE_PLAYERS";
export const FETCH_PERSONAL_RANKING = "FETCH_PERSONEL_RANKING";
export const SAVE_PERSONAL_RANKING = "SAVE_PERSONAL_RANKING";

export const fetchRanking = (category1, category2) => ({
  type: FETCH_RANKING,
  category1,
  category2
});

export const saveRanking = (ranking) => ({
  type: SAVE_RANKING,
  ranking
})

export const fetchPlayers = () => ({
  type: FETCH_PLAYERS
})

export const savePlayers = (nbPlayers) => ({
  type: SAVE_PLAYERS,
  nbPlayers
})

export const fetchPersonalRanking = () => ({
  type: FETCH_PERSONAL_RANKING,
})

export const savePersonalRanking = (ranking) => ({
  type: SAVE_PERSONAL_RANKING,
  ranking
})
