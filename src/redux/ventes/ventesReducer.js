const INITIAL_STATE = {
	ventes: [],
	annee: null,
	id_current_collaborateur: null,
};

export const ventesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "LOAD_VENTES":
			return { ...state, ventes: action.payload };

		case "SET_ANNEE_VENTES":
			return { ...state, annee: action.payload };

		case "SET_ID_CURRENT":
			return { ...state, id_current_collaborateur: action.payload };

		default:
			return state;
	}
};

export const loadVentes = (annee, id) => dispatch => {
	if (annee && id)
		fetch("http://localhost/Stage-Jexlprod-Backend/ventes/LoadVentes.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ annee, id_collaborateur: id }),
		})
			.then(response => response.json())
			.then(data => {
				dispatch({ type: "LOAD_VENTES", payload: data });
			});
};

export const requestDB = (file, body) => dispatch => {
	const { collaborateur, date } = body;
	const year = date.split("-")[0];

	fetch(`http://localhost:80/Stage-Jexlprod-Backend/ventes/${file}.php`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			// "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
		},
		body: JSON.stringify(body),
		// body: new URLSearchParams(body),
	}).then(dispatch(loadVentes(year, collaborateur)));
};

export const deleteVente = (id_collaborateur, annee, id_vente) => dispatch => {
	fetch("http://localhost/Stage-Jexlprod-Backend/ventes/DeleteVente.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id_vente }),
	}).then(() => {
		dispatch(loadVentes(annee, id_collaborateur));
	});
};
