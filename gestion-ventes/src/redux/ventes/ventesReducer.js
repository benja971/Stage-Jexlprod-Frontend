const INITIAL_STATE = {
	ventes: [],
};

export default function ventesReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case "ADD_VENTE":
			break;

		default:
			break;
	}
}

export const requestDB = (file, body) => dispatch => {
	console.log(JSON.stringify(body, "\n", 4));

	fetch(`http://localhost:80/Stage-Jexlprod-Backend/Ventes/${file}.php`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
	console.log("Fetch requestDB");
};
