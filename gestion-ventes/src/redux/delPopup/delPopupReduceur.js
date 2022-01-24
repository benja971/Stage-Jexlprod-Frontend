const INTITIAL_STATE = {
	isPopupVisible: false,
	id_collaborateur: null,
	id_vente: null,
	annee: null,
};

export const delPopupReducer = (state = INTITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_VISIBLE":
			return {
				...state,
				isPopupVisible: true,
				id_collaborateur: action.payload.id,
				annee: action.payload.annee,
			};

		case "SET_VISIBLE_FROM_VENTE":
			return {
				...state,
				isPopupVisible: true,
				id_collaborateur: action.payload.id_collaborateur,
				id_vente: action.payload.id_vente,
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
