export const UPDATE_SELECTED_BASE = "UPDATE_SELECTED_BASE";
export const FETCH_FACILITIES = "FETCH_FACILITIES";
export const SAVE_FACILITIES_INFO = "SAVE_FACILITIES_INFO";
export const CHANGE_CURRENT_FACILITY = "CHANGE_CURRENT_FACILITY";
export const FETCH_FACILITIES_UPDATES = "FETCH_FACILITIES_UPDATES";
export const SAVE_FACILITIES_UPDATES_INFO = "SAVE_FACILITIES_UPDATES_INFO";
export const FETCH_TECHNOLOGIES = "FETCH_TECHNOLOGIES";
export const SAVE_TECHNOLOGIES_INFO = "SAVE_TECHNOLOGIES_INFO";
export const CHANGE_CURRENT_TECHNOLOGY = "CHANGE_CURRENT_TECHNOLOGY";
export const FETCH_TECHNOLOGIES_UPDATES = "FETCH_TECHNOLOGIES_UPDATES";
export const SAVE_TECHNOLOGIES_UPDATES_INFO = "SAVE_TECHNOLOGIES_UPDATES_INFO";
export const FETCH_BASE_INFOS = "FETCH_BASE_INFOS";
export const SAVE_BASE_INFOS = "SAVE_BASE_INFOS";

export const updateSelectedBase = (selectedBase) => ({
  type: UPDATE_SELECTED_BASE,
  selectedBase,
});

export const fetchFacilities = () => ({
  type: FETCH_FACILITIES,
});

export const saveFacilitiesInfo = (name, facilities) => ({
  type: SAVE_FACILITIES_INFO,
  name,
  facilities,
});

export const changeCurrentFacility = (name, item) => ({
  type: CHANGE_CURRENT_FACILITY,
  name,
  item,
});

export const fetchFacilitiesUpdates = () => ({
  type: FETCH_FACILITIES_UPDATES,
});

export const saveFacilitiesUpdatesInfo = (name, updates) => ({
  type: SAVE_FACILITIES_UPDATES_INFO,
  name,
  updates,
});

export const fetchTechnologies = () => ({
  type: FETCH_TECHNOLOGIES,
});

export const saveTechnologiesInfo = (name, technologies) => ({
  type: SAVE_TECHNOLOGIES_INFO,
  name,
  technologies,
});

export const changeCurrentTechnology = (name, item) => ({
  type: CHANGE_CURRENT_TECHNOLOGY,
  name,
  item,
});

export const fetchTechnologiesUpdates = () => ({
  type: FETCH_TECHNOLOGIES_UPDATES,
});

export const saveTechnologiesUpdatesInfo = (name, updates) => ({
  type: SAVE_TECHNOLOGIES_UPDATES_INFO,
  name,
  updates,
});

export const fetchBaseInfos = () => ({
  type: FETCH_BASE_INFOS,
});

export const saveBaseInfos = (name, infos) => ({
  type: SAVE_BASE_INFOS,
  name,
  infos,
});
