const INTITIAL_STATE = {
	isPopupVisible: false,
	id_from_popup: null,
	annee: null,
};

export const delPopupReducer = (state = INTITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_VISIBLE":
			return {
				...state,
				isPopupVisible: true,
				id_from_popup: action.payload.id,
				annee: action.payload.annee,
			};

		case "SET_INVISIBLE":
			return {
				...state,
				isPopupVisible: false,
			};

		default:
			return state;
	}
};
