import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { collaborateursReducer } from "./collaborateurs/collaborateursReducer";
import { delPopupReducer } from "./delPopup/delPopupReduceur";
import { ventesReducer } from "./ventes/ventesReducer";

const rootReducer = combineReducers({
	collaborateursReducer,
	delPopupReducer,
	ventesReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
