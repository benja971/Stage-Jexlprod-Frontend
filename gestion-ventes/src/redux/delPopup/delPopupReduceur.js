const INTITIAL_STATE = {
	isPopupVisible: false,
	id: null,
};

export const delPopupReducer = (state = INTITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_VISIBLE":
			return {
				...state,
				isPopupVisible: true,
				id: action.payload,
			};

		case "SET_INVISIBLE":
			return {
				...state,
				isPopupVisible: false,
				id: action.payload,
			};

		default:
			return state;
	}
};
