import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Status from "./Status";
import Pictographs from "./Pictographs";

const reducers = combineReducers({
  status: Status,
  pictographs: Pictographs
});
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
