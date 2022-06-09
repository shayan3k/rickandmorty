import * as types from "../types";

export const getCharacters = (data) => async (dispatch) => {
  dispatch({
    type: types.GET_CHARACTER,
    payload: data,
  });
};
