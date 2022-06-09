import * as types from "../types";
const initialState = {
  character: [],
  hydratedBy: null,
};

export const charactersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.HYDRATE:
      const nextState = {
        ...state,
        ...payload.character,
        hydratedBy: "server",
      };
      if (state.hydratedBy == "client") return state;
      return { ...nextState };
    case types.GET_CHARACTER:
      return {
        ...state,
        character: payload,
        hydratedBy: "client",
      };
    default:
      return state;
  }
};
