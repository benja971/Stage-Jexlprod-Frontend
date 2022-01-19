import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { collaborateursReducer } from "./collaborateurs/collaborateursReducer";

const rootReducer = combineReducers({
	collaborateursReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
