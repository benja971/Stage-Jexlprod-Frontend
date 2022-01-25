import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { collaborateursReducer } from "./collaborateurs/collaborateursReducer";
import { delPopupReducer } from "./delPopup/delPopupReduceur";
import { ventesReducer } from "./ventes/ventesReducer";
import { loginReducer } from "./logged/loginReducer";

const rootReducer = combineReducers({
	collaborateursReducer,
	delPopupReducer,
	ventesReducer,
	loginReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
