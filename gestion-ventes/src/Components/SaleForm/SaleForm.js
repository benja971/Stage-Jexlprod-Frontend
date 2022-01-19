import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export default function SaleForm() {
	const data = useLocation().state;
	const isNew = data ? false : true;

	const [collabs, setCollabs] = useState([]);
	const [vente, setVente] = useState(isNew ? {} : { ...data.vente });

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
			console.log(key);
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
		if (name === "collaborateur") {
			value = value === "" ? "" : parseInt(value);
		}

		setVente({ ...vente, [name]: value });
		validForm();
	};

	useEffect(() => {
		fetch("http://localhost/Stage-Jexlprod-Backend/Collaborateurs/LoadCollaborateurs.php", {
			method: "GET",
		})
			.then(response => response.json())
			.then(data => {
				setCollabs(data);
				setVente({ ...vente, collaborateur: parseInt(data[0].id) });
			});
	}, []);

	const handleSubmit = e => {
		
	};

	return (
		<>
			<h1>Nouvelle vente</h1>
			<form onSubmit={handleSubmit}>
				<input type='hidden' name='id' onChange={handleChange} />

				<label htmlFor='adresse'>Libéllé</label>
				<input ref={addToInputsRef} type='text' name='adresse' placeholder='Libéllé' onChange={handleChange} />

				<label htmlFor='ville'>Ville</label>
				<input ref={addToInputsRef} type='text' name='ville' placeholder='Ville' onChange={handleChange} />

				<label htmlFor='code_postal'>Code postal</label>
				<input ref={addToInputsRef} type='number' pattern='^\s*?\d{5}(?:[-\s]\d{4})?\s*?$' name='code_postal' placeholder='Code postal' onChange={handleChange} />
				<p ref={zip_error} className='invisible'>
					Le code postal est invallide
				</p>

				<label htmlFor='date'>Date</label>
				<input ref={addToInputsRef} type='date' name='date' onChange={handleChange} />

				<label htmlFor='prix'>Prix</label>
				<input ref={addToInputsRef} type='number' min={0} step={0.01} name='prix' placeholder='Prix' onChange={handleChange} />

				<label htmlFor='collaborateur' onChange={handleChange}>
					Collaborateur
				</label>
				<select ref={addToInputsRef} name='collaborateur' onChange={handleChange} value={vente.collaborateur}>
					{collabs.map(collab => {
						return (
							<option key={uuidv4()} value={collab.id}>
								{collab.nom + " " + collab.prenom}
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
