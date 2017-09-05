import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Status from "./Status";

const reducers = combineReducers({
  status: Status
});
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
