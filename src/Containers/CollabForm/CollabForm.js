import React from "react";
import "./CollabForm.css";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestDB } from "../../redux/collaborateurs/collaborateursReducer";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function CollabForm() {
	const isLogged = useSelector(state => state.loginReducer.isLogged);
	if (!isLogged) window.location.href = "/";

	// eslint-disable-next-line no-extend-native
	String.prototype.toTitleCase = function () {
		return this.split(" ")
			.map(function (ele) {
				return ele[0].toUpperCase() + ele.slice(1).toLowerCase();
			})
			.join(" ");
	};

	const data = useLocation().state;
	const isNew = data ? false : true;

	const inputsRef = useRef([]);
	const errorsRef = useRef([]);

	const [roles, setRoles] = useState([]);
	const [collab, setCollab] = useState(
		isNew
			? {
					civilite: "M",
					nom: "",
					prenom: "",
					email: "",
					statut: 0,
			  }
			: { ...data.collaborateur },
	);

	const [isFormValid, setIsFormValid] = useState(isNew ? false : true);

	const addInputToRef = element => {
		if (element && !inputsRef.current.includes(element)) inputsRef.current[element.name] = element;
	};

	const addPToRef = element => {
		if (element && !errorsRef.current.includes(element)) errorsRef.current[element.id] = element;
	};

	const dispatch = useDispatch();

	const validForm = () => {
		let isValid = true;
		for (let key in inputsRef.current) {
			if (inputsRef.current[key].value === "" || inputsRef.current[key].classList.contains("error")) {
				isValid = false;
				break;
			}
		}
		setIsFormValid(isValid);
	};

	const handleChange = e => {
		let { name, value } = e.target;
		const error_container = `${name}-error-container`;

		// nom et prénom
		if (name === "nom" || (name === "prenom" && value.length > 0)) {
			const valid = value.length !== 1;

			inputsRef.current[name].classList.toggle("error", !valid);
			errorsRef.current[error_container].classList.toggle("invisible", valid);

			value = name === "nom" ? value.toUpperCase() : value.toTitleCase();
		}

		//email
		else if (name === "email") {
			const valid = /^([\w.-]+)@([\w-]+)((\.(\w){2,})+)$/.test(value);

			inputsRef.current[name].classList.toggle("error", !valid);
			errorsRef.current[error_container].classList.toggle("invisible", valid);

			value = value.toLowerCase();
		}

		//statut
		else if (name === "statut") value = parseInt(value);

		setCollab({ ...collab, [name]: value });
		validForm();
	};

	const handleSubmit = e => {
		e.preventDefault();

		dispatch(requestDB(isNew ? "NewCollaborateur" : "ModifCollaborateur", collab));

		window.location.href = "/collaborateurs";
	};

	useEffect(() => {
		fetch("http://localhost/Stage-Jexlprod-Backend/Collaborateurs/GetRoles.php", {
			method: "GET",
		})
			.then(response => response.json())
			.then(data => {
				setRoles(data);
			});
	}, []);

	return (
		<div className='collab-form-page'>
			<h1 className='collab-title'>{isNew ? "Nouveau " : "Modifier un "}Collaborateur</h1>
			<form className='collab-form-app' onSubmit={handleSubmit}>
				<input type='hidden' name='id' value={collab.id} />
				<div className='input-container collab-civilite'>
					<label htmlFor='civilite'>Civilité</label>
					<select ref={addInputToRef} name='civilite' value={collab.civilite} onChange={handleChange}>
						<option value='M'>M</option>
						<option value='Mme'>Mme</option>
						<option value='Mlle'>Mlle</option>
					</select>
				</div>
				<div className='container-identite'>
					<div className='input-container collab-nom'>
						<label htmlFor='nom'>Nom</label>
						<input ref={addInputToRef} type='text' name='nom' placeholder='Nom du collaborateur' value={collab.nom} onChange={handleChange} />
						<p ref={addPToRef} id='nom-error-container' className='invisible'>
							Le nom doit faire plus d'un caractère
						</p>
					</div>

					<div className='input-container collab-prenom'>
						<label htmlFor='prenom'>Prénom</label>
						<input ref={addInputToRef} type='text' name='prenom' placeholder='Prénom du collaborateur' value={collab.prenom} onChange={handleChange} />
						<p ref={addPToRef} id='prenom-error-container' className='invisible'>
							Le prénom doit faire plus d'un caractère
						</p>
					</div>
				</div>

				<div className='container-infos'>
					<div className='input-container collab-email'>
						<label htmlFor='email'>Email</label>
						<input ref={addInputToRef} type='email' name='email' placeholder='Email du collaborateur' value={collab.email} onChange={handleChange} />
						<p ref={addPToRef} id='email-error-container' className='invisible'>
							L'adresse email entrée est invalide
						</p>
					</div>
					<div className='input-container collab-statut'>
						<label htmlFor='remunération'>Grille de rémunération</label>
						<select ref={addInputToRef} name='statut' value={collab.statut} onChange={handleChange}>
							{roles.map(role => {
								return (
									<option key={uuidv4()} value={role.id_role}>
										{role.nom}
									</option>
								);
							})}
						</select>
					</div>
				</div>
				<div className='btn-container'>
					<Link className='cancel' to={"/collaborateurs"}>
						Annuler
					</Link>
					<button type='submit' id='submit' className={!isFormValid ? "disabled valid" : "valid"} {...(!isFormValid && { disabled: true })}>
						Valider
					</button>
				</div>
			</form>
		</div>
	);
}
