const INITIAL_STATE = {
	collaborateurs: [],
	annee: null,
};

export const collaborateursReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "LOAD_COLLABORATEURS":
			return {
				...state,
				collaborateurs: [...action.payload],
			};

		case "SET_ANNEE_COLLABORATEURS":
			return {
				...state,
				annee: action.payload,
			};

		default:
			return state;
	}
};

export const loadCollaborateurs = annee => dispatch => {
	console.log(annee);
	fetch("http://localhost:80/Stage-Jexlprod-Backend/Collaborateurs/LoadCollaborateurs.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ annee }),
	})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			dispatch({
				type: "LOAD_COLLABORATEURS",
				payload: data,
			});
		})
		.catch(err => {
			console.log("Collaborateurs liste : ", err.message);
		});
};

export const requestDB = (file, body) => dispatch => {
	fetch(`http://localhost:80/Stage-Jexlprod-Backend/Collaborateurs/${file}.php`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
};

export const deleteCollaborateur = (id, annee) => dispatch => {
	fetch(`http://localhost:80/Stage-Jexlprod-Backend/Collaborateurs/DeleteCollaborateur.php`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id: parseInt(id) }),
	}).then(() => {
		dispatch(loadCollaborateurs(annee));
	});
};
