import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { requestDB } from "../../redux/ventes/ventesReducer";

export default function SaleForm() {
	const isLogged = useSelector(state => state.loginReducer.isLogged);
	// if (!isLogged) window.location.href = "/";

	const data = useLocation().state;
	const nouveau = data.nouveau;

	const [collabs, setCollabs] = useState([]);
	const [vente, setVente] = useState(
		nouveau
			? {
					adresse: "",
					ville: "",
					code_postal: "",
					date: "",
					prix: "",
					collaborateur: parseInt(data.id),
			  }
			: data.vente,
	);

	// console.table(vente);

	const formRef = useRef(null);
	const inputsRef = useRef([]);
	const zip_error = useRef(null);
	const [isFormValid, setIsFormValid] = useState(nouveau ? false : true);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const addToInputsRef = element => {
		if (element !== null && !inputsRef.current.includes(element)) inputsRef.current[element.name] = element;
	};

	const validForm = () => {
		let isValid = true;
		for (const key in inputsRef.current) {
			if (inputsRef.current[key].value === "" || inputsRef.current[key].classList.contains("error")) {
				isValid = false;
				break;
			}
		}
		setIsFormValid(isValid);
	};

	const handleChange = e => {
		let { name, value } = e.target;

		//code postal
		if (name === "code_postal") {
			const valid = value === "" || value.length === 5;
			zip_error.current.classList.toggle("invisible", valid);
			inputsRef.current[name].classList.toggle("error", !valid);
		}

		//collaborateur
		else if (name === "collaborateur") {
			value = value === "" ? "" : parseInt(value);
		}

		//prix
		else if (name === "prix") value = value === "" ? "" : parseFloat(value);

		setVente({ ...vente, [name]: value });
		validForm();
	};

	useEffect(() => {
		fetch("http://localhost:80/Stage-Jexlprod-Backend/Collaborateurs/GetCollaborateursNames.php", {
			method: "GET",
		})
			.then(response => response.json())
			.then(data => {
				setCollabs(data);
			});
	}, []);

	const handleSubmit = e => {
		e.preventDefault();

		dispatch({ type: "SET_ID_CURRENT", payload: vente.collaborateur });

		console.table(vente);

		dispatch(requestDB(nouveau ? "NewVente" : "UpdateVente", vente));

		navigate("/ventes", { state: { id: nouveau ? data.id : parseInt(vente.collaborateur), annee: nouveau ? data.annee : parseInt(data.vente.date.substring(0, 4)) } });
	};

	return (
		<>
			<h1>{nouveau ? "Nouvelle " : "Modifier la "} vente</h1>
			<form className='form-app' ref={formRef} onSubmit={handleSubmit}>
				<input type='hidden' name='id' />

				<label htmlFor='adresse'>Libéllé</label>
				<input ref={addToInputsRef} type='text' name='adresse' placeholder='Libéllé' onChange={handleChange} value={vente.adresse} />

				<label htmlFor='ville'>Ville</label>
				<input ref={addToInputsRef} type='text' name='ville' placeholder='Ville' onChange={handleChange} value={vente.ville} />

				<label htmlFor='code_postal'>Code postal</label>
				<input ref={addToInputsRef} type='number' pattern='^\s*?\d{5}(?:[-\s]\d{4})?\s*?$' name='code_postal' placeholder='Code postal' onChange={handleChange} value={vente.code_postal} />
				<p ref={zip_error} className='invisible'>
					Le code postal est invallide
				</p>

				<label htmlFor='date'>Date</label>
				<input ref={addToInputsRef} type='date' name='date' onChange={handleChange} value={vente.date} />

				<label htmlFor='prix'>Valeur HT de la commission</label>
				<input ref={addToInputsRef} type='number' min={0} step={0.01} name='prix' placeholder='Commission' onChange={handleChange} value={vente.prix} />

				<label htmlFor='collaborateur' onChange={handleChange} value={vente.collaborateur}>
					Collaborateur
				</label>

				<select ref={addToInputsRef} name='collaborateur' onChange={handleChange} value={vente.collaborateur}>
					{collabs.map(collab => {
						return (
							<option key={uuidv4()} value={collab.id_collaborateur}>
								{collab.nom}
							</option>
						);
					})}
				</select>

				<div className='btn-container '>
					<Link to={"/ventes"} state={{ id: nouveau ? parseInt(data.id) : parseInt(data.vente.collaborateur), annee: nouveau ? data.annee : parseInt(data.vente.date.substring(0, 4)) }} className='cancel'>
						Annuler
					</Link>
					<button type='submit' disabled={!isFormValid} className={isFormValid ? "valid" : "valid disabled"}>
						Valider
					</button>
				</div>
			</form>
		</>
	);
}
