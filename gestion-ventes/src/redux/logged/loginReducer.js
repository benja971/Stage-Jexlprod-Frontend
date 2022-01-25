const INITIAL_STATE = {
	isLogged: false,
};

export function loginReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				isLogged: true,
			};

		case "LOGOUT":
			return {
				...state,
				isLogged: false,
			};

		default:
			return state;
	}
}

export const logIn = () => dispatch => {
	dispatch({
		type: "LOGIN",
	});
};
