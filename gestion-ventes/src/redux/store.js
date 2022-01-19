import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { collaborateursReducer } from "./collaborateurs/collaborateursReducer";
import { delPopupReducer } from "./delPopup/delPopupReduceur";

const rootReducer = combineReducers({
	collaborateursReducer,
	delPopupReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
