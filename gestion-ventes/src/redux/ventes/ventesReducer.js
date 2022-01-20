const INITIAL_STATE = {
	ventes: [],
	annee: null,
};

export const ventesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "LOAD_VENTES":
			return { ...state, ventes: action.payload };

		case "SET_ANNEE_VENTES":
			return { ...state, annee: action.payload };

		default:
			return state;
	}
};

export const loadVentes = annee => dispatch => {
	fetch("http://localhost/Stage-Jexlprod-Backend/ventes/LoadVentes.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ annee }),
	})
		.then(response => response.json())
		.then(data => {
			dispatch({ type: "LOAD_VENTES", payload: data });
		});
};

export const requestDB = (file, body) => dispatch => {
	fetch(`http://localhost:80/Stage-Jexlprod-Backend/ventes/${file}.php`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
};
