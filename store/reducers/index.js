import { combineReducers } from "redux";
import { charactersReducer } from "./charactersReducer";

export default combineReducers({
  character: charactersReducer,
});
