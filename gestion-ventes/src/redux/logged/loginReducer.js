const INITIAL_STATE = {
	isLogged: false,
};

export function loginReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case "LOGIN_SUCCESS":
			return { ...state, isLogged: true };
		case "LOGIN_FAIL":
			return { ...state, isLogged: false };
		case "LOGOUT":
			return { ...state, isLogged: false };
		default:
			return state;
	}
}
