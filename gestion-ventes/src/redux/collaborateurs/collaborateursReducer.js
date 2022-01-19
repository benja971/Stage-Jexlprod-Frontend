const INITIAL_STATE = {
	collaborateurs: [],
};

export const collaborateursReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "LOAD_COLLABORATEURS":
			return {
				...state,
				collaborateurs: [...action.payload],
			};

		default:
			return state;
	}
};

export const loadCollaborateurs = () => dispatch => {
	console.log("loadCollaborateurs");
	fetch("http://localhost:80/Stage-Jexlprod-Backend/Collaborateurs/LoadCollaborateurs.php", {
		method: "GET",
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

export const requestDB = (file, body, id) => dispatch => {
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
