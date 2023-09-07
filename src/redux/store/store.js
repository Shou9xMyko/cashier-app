import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import CashierReducer from "../reducer/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  CashierReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
