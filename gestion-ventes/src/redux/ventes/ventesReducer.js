const INITIAL_STATE = {
	ventes: [],
};

export const ventesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "LOAD_VENTES":
			return { ...state, ventes: action.payload };

		default:
			return state;
	}
};

export const loadVentes = () => dispatch => {
	fetch("http://localhost/Stage-Jexlprod-Backend/ventes/LoadVentes.php", {
		method: "GET",
	})
		.then(response => response.json())
		.then(data => {
			dispatch({ type: "LOAD_VENTES", payload: data });
		});
};

export const requestDB = (file, body) => dispatch => {
	console.log(`http://localhost:80/Stage-Jexlprod-Backend/ventes/${file}.php`);
	console.log(JSON.stringify(body, "\n", 4));

	fetch(`http://localhost:80/Stage-Jexlprod-Backend/ventes/${file}.php`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
	console.log("Fetch requestDB");
};
