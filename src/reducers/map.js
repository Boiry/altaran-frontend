import {
  UPDATE_COORDINATES_FIELD,
  SAVE_STAR_SYSTEM_INFO,
  SAVE_REGIONS_INFO,
  SAVE_SECTORS_INFO,
  SAVE_STAR_SYSTEMS_INFO,
  SET_SECTORS_LOADING,
  SET_STAR_SYSTEMS_LOADING,
  SAVE_CURRENT_REGION,
  SAVE_CURRENT_SECTOR,
  SAVE_CURRENT_STAR_SYSTEM,
  DELETE_STAR_SYSTEM_NAME,
  SET_CAMERA_POSITION,
} from 'src/actions/map';

const initialState = {
  region: '',
  sector: '',
  starSystem: '',
  starSystemInfo: '',
  regionsInfo: '',
  sectorsInfo: '',
  starSystemsInfo: '',
  sectorsAreLoading: 'false',
  starSystemsAreLoading: 'false',
  currentRegion: '',
  currentSector: '',
  currentStarSystem: '',
  cameraPosition: '',
};

const map = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_COORDINATES_FIELD:
      return {
        ...state,
        [action.name]: action.value,
      };
    case SAVE_STAR_SYSTEM_INFO:
      return {
        ...state,
        starSystemInfo: action.starSystem,
      };
    case SAVE_REGIONS_INFO:
      return {
        ...state,
        regionsInfo: action.info,
      }
    case SAVE_SECTORS_INFO:
      return {
        ...state,
        sectorsInfo: action.info,
      };
    case SAVE_STAR_SYSTEMS_INFO:
      return {
        ...state,
        starSystemsInfo: action.info,
      };
    case SET_SECTORS_LOADING:
      return {
        ...state,
        sectorsAreLoading: action.loading,
      };
    case SET_STAR_SYSTEMS_LOADING:
      return {
        ...state,
        starSystemsAreLoading: action.loading,
      };
    case SAVE_CURRENT_REGION:
      return {
        ...state,
        currentRegion: action.current,
      };
    case SAVE_CURRENT_SECTOR:
      return {
        ...state,
        currentSector: action.current,
      };
    case SAVE_CURRENT_STAR_SYSTEM:
      return {
        ...state,
        currentStarSystem: action.current,
      };
    case DELETE_STAR_SYSTEM_NAME:
      return {
        ...state,
        starSystemInfo: '',
      };
    case SET_CAMERA_POSITION:
      return {
        ...state,
        cameraPosition: action.position,
      };

    default: return { ...state };
  }
};

export default map;
