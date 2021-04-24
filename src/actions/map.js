export const UPDATE_COORDINATES_FIELD = "UPDATE_COORDINATES_FIELD";

export const updateCoordinatesField = (value, name) => ({
  type: UPDATE_COORDINATES_FIELD,
  value,
  name,
});
