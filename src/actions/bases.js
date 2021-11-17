export const FETCH_BASES = "FETCH_BASES";
export const SAVE_BASES = "SAVE_BASES";
export const SAVE_BASE = "SAVE_BASE";
export const SAVE_BASE_SELECTOR = "SAVE_BASE_SELECTOR";
export const UPDATE_SELECTED_BASE = "UPDATE_SELECTED_BASE";
export const FETCH_FACILITIES_LEVELS = "FETCH_FACILITIES_LEVELS";
export const SAVE_FACILITIES_LEVELS = "SAVE_FACILITIES_LEVELS";
export const FETCH_CURRENT_FACILITY = "FETCH_CURRENT_FACILITY";
export const SAVE_CURRENT_FACILITY = "SAVE_CURRENT_FACILITY";
export const CHANGE_CURRENT_FACILITY = "CHANGE_CURRENT_FACILITY";
export const FETCH_FACILITIES_UPGRADES = "FETCH_FACILITIES_UPGRADES";
export const SAVE_FACILITIES_UPGRADES = "SAVE_FACILITIES_UPGRADES";
export const ADD_FACILITY_UPGRADE = "ADD_FACILITY_UPGRADE";
export const REMOVE_FACILITY_UPGRADE = "REMOVE_FACILITY_UPGRADE";

export const FETCH_TECHNOLOGIES = "FETCH_TECHNOLOGIES";
export const SAVE_TECHNOLOGIES_INFO = "SAVE_TECHNOLOGIES_INFO";
export const CHANGE_CURRENT_TECHNOLOGY = "CHANGE_CURRENT_TECHNOLOGY";
export const FETCH_TECHNOLOGIES_UPDATES = "FETCH_TECHNOLOGIES_UPDATES";
export const SAVE_TECHNOLOGIES_UPDATES_INFO = "SAVE_TECHNOLOGIES_UPDATES_INFO";
export const FETCH_BASE_RESOURCES = "FETCH_BASE_RESOURCES";
export const SAVE_BASE_RESOURCES = "SAVE_BASE_RESOURCES";

export const fetchBases = () => ({
  type: FETCH_BASES,
});

export const saveBases = (bases) => ({
  type: SAVE_BASES,
  bases,
});

export const saveBase = (index, base) => ({
  type: SAVE_BASE,
  index,
  base,
});

export const saveBaseSelector = (index, id, name) => ({
  type: SAVE_BASE_SELECTOR,
  index,
  id,
  name,
})

export const updateSelectedBase = (selectedBase) => ({
  type: UPDATE_SELECTED_BASE,
  selectedBase,
});

export const fetchFacilitiesLevels = () => ({
  type: FETCH_FACILITIES_LEVELS,
});

export const saveFacilitiesLevels = (base, levels) => ({
  type: SAVE_FACILITIES_LEVELS,
  base,
  levels,
});

export const fetchCurrentFacility = (base, baseId, facility) => ({
  type: FETCH_CURRENT_FACILITY,
  base,
  baseId,
  facility,
});

export const saveCurrentFacility = (base, facility) => ({
  type: SAVE_CURRENT_FACILITY,
  base,
  facility,
});

export const changeCurrentFacility = (base, facility) => ({
  type: CHANGE_CURRENT_FACILITY,
  base,
  facility,
});

export const fetchFacilitiesUpgrades = (baseId) => ({
  type: FETCH_FACILITIES_UPGRADES,
  baseId,
});

export const saveFacilitiesUpgrades = (base, upgrades) => ({
  type: SAVE_FACILITIES_UPGRADES,
  base,
  upgrades,
});

export const addFacilityUpgrade = (baseId, facility) => ({
  type: ADD_FACILITY_UPGRADE,
  baseId,
  facility,
});

export const removeFacilityUpgrade = (baseId, facility) => ({
  type: REMOVE_FACILITY_UPGRADE,
  baseId,
  facility,
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

export const fetchBaseResources = () => ({
  type: FETCH_BASE_RESOURCES,
});

export const saveBaseResources = (base, resources) => ({
  type: SAVE_BASE_RESOURCES,
  base,
  resources,
});
