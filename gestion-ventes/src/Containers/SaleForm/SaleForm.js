import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { requestDB } from "../../redux/ventes/ventesReducer";

export default function SaleForm() {
	const data = useLocation().state;
	const isNew = data ? false : true;

	const [collabs, setCollabs] = useState([]);
	const [vente, setVente] = useState(isNew ? {} : data);

	const inputsRef = useRef([]);
	const zip_error = useRef(null);
	const [isFormValid, setIsFormValid] = useState(isNew ? false : true);

	const dispatch = useDispatch();

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
			console.log(value);
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
				setVente({ ...vente, collaborateur: parseInt(data[0].id) });
			});
	}, []);

	const handleSubmit = e => {
		e.preventDefault();

		dispatch(requestDB(isNew ? "NewVente" : "UpdateVente", vente));

		window.location.href = "/ventes";
	};

	return (
		<>
			<h1>{isNew ? "Nouvelle " : "Modifier la "} vente</h1>
			<form onSubmit={handleSubmit}>
				<input type='hidden' name='id' onChange={handleChange} />

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

				<label htmlFor='prix'>Prix</label>
				<input ref={addToInputsRef} type='number' min={0} step={0.01} name='prix' placeholder='Prix' onChange={handleChange} value={vente.prix} />

				<label htmlFor='collaborateur' onChange={handleChange} value={vente.collaborateur}>
					Collaborateur
				</label>
				<select ref={addToInputsRef} name='collaborateur' onChange={handleChange} value={vente.collaborateur}>
					{collabs.map(collab => {
						return (
							<option key={uuidv4()} value={collab.id}>
								{collab.nom}
							</option>
						);
					})}
				</select>

				<div className='btn-container'>
					<Link to={"/ventes"}>Annuler</Link>
					<button {...(!isFormValid && { disabled: true })} className={isFormValid ? "" : "disabled"}>
						Valider
					</button>
				</div>
			</form>
		</>
	);
}
