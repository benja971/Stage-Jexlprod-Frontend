const INITIAL_STATE = {
	collaborateurs: [],
	annee: new Date().getFullYear(),
};

export const collaborateursReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "LOAD_COLLABORATEURS":
			return {
				...state,
				collaborateurs: [...action.payload],
			};

		case "SET_ANNEE":
			return {
				...state,
				annee: action.payload,
			};

		default:
			return state;
	}
};

export const loadCollaborateurs = annee => dispatch => {
	console.log("année", annee);
	fetch("http://localhost:80/Stage-Jexlprod-Backend/Collaborateurs/LoadCollaborateurs.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ annee }),
	})
		.then(response => response.json())
		.then(data => {
			dispatch({
				type: "LOAD_COLLABORATEURS",
				payload: data,
			});
		})
		.catch(err => {
			console.log("liste : ", err.message);
		});
};

export const requestDB = (file, body) => dispatch => {
	console.log(JSON.stringify(body, "\n", 4));

	fetch(`http://localhost:80/Stage-Jexlprod-Backend/Collaborateurs/${file}.php`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	console.log("Fetch requestDB");
};

export const deleteCollaborateur = id => dispatch => {
	fetch(`http://localhost:80/Stage-Jexlprod-Backend/Collaborateurs/DeleteCollaborateur.php`, {
		method: "POST",
		body: JSON.stringify(id),
	})
		.then(response => response.json())
		.then(data => {
			dispatch({
				type: "LOAD_COLLABORATEURS",
				payload: data,
			});
		});
};
