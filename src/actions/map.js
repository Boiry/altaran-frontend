export const UPDATE_COORDINATES_FIELD = "UPDATE_COORDINATES_FIELD";
export const FETCH_STAR_SYSTEM = "FETCH_STAR_SYSTEM";
export const SAVE_STAR_SYSTEM_INFO = "SAVE_STAR_SYSTEM_INFO";
export const FETCH_REGIONS = "FETCH_REGIONS";
export const SAVE_REGIONS_INFO = "SAVE_REGIONS_INFO";
export const FETCH_SECTORS = "FETCH_SECTORS";
export const SAVE_SECTORS_INFO = "SAVE_SECTORS_INFO";
export const FETCH_STAR_SYSTEMS = "FETCH_STAR_SYSTEMS";
export const SAVE_STAR_SYSTEMS_INFO = "SAVE_STAR_SYSTEMS_INFO";
export const SET_SECTORS_LOADING = "SET_SECTORS_LOADING";
export const SET_STAR_SYSTEMS_LOADING = "SET_STAR_SYSTEMS_LOADING";
export const SAVE_CURRENT_REGION = "SAVE_CURRENT_REGION";
export const SAVE_CURRENT_SECTOR = "SAVE_CURRENT_SECTOR";
export const SAVE_CURRENT_STAR_SYSTEM = "SAVE_CURRENT_STAR_SYSTEM";
export const DELETE_STAR_SYSTEM_NAME = "DELETE_STAR_SYSTEM_NAME";
export const SET_CAMERA_POSITION = "SET_CAMERA_POSITION";
export const SET_CAMERA_DIRECTION = "SET_CAMERA_DIRECTION";

export const updateCoordinatesField = (value, name) => ({
  type: UPDATE_COORDINATES_FIELD,
  value,
  name,
});

export const fetchStarSystem = (region, sector, starSystem) => ({
  type: FETCH_STAR_SYSTEM,
  region,
  sector,
  starSystem,
});

export const saveStarSystemInfo = (starSystem) => ({
  type: SAVE_STAR_SYSTEM_INFO,
  starSystem,
});

export const fetchRegions = () => ({
  type: FETCH_REGIONS,
})

export const saveRegionsInfo = (info) => ({
  type: SAVE_REGIONS_INFO,
  info,
})

export const fetchSectors = (region) => ({
  type: FETCH_SECTORS,
  region,
});

export const saveSectorsInfo = (info) => ({
  type: SAVE_SECTORS_INFO,
  info,
});

export const fetchStarSystems = (region, sector) => ({
  type: FETCH_STAR_SYSTEMS,
  region,
  sector,
});

export const saveStarSystemsInfo = (info) => ({
  type: SAVE_STAR_SYSTEMS_INFO,
  info,
});

export const setSectorsLoading = (loading) => ({
  type: SET_SECTORS_LOADING,
  loading,
});

export const setStarSystemsLoading = (loading) => ({
  type: SET_STAR_SYSTEMS_LOADING,
  loading,
});

export const saveCurrentRegion = (current) => ({
  type: SAVE_CURRENT_REGION,
  current,
});

export const saveCurrentSector = (current) => ({
  type: SAVE_CURRENT_SECTOR,
  current,
});

export const saveCurrentStarSystem = (current) => ({
  type: SAVE_CURRENT_STAR_SYSTEM,
  current,
});

export const deleteStarSystemName = () => ({
  type: DELETE_STAR_SYSTEM_NAME,
});

export const setCameraPosition = (position) => ({
  type: SET_CAMERA_POSITION,
  position,
});

export const setCameraDirection = (direction) => ({
  type: SET_CAMERA_DIRECTION,
  direction,
});
