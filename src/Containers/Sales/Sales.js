import React, { useEffect } from "react";
import "./Sales.css";
import SalesList from "../../Components/SalesList/SalesList";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import "./Sales.css";

export default function Sales() {
	const isLogged = useSelector(state => state.loginReducer.isLogged);
	// if (!isLogged) window.location.href = "/";

	const { id, annee } = useLocation().state;

	const anneeaffichage = useSelector(state => state.ventesReducer.annee);

	const dispatch = useDispatch();

	const [years, setYears] = useState([]);

	const handleChange = e => {
		dispatch({
			type: "SET_ANNEE_VENTES",
			payload: parseInt(e.target.value),
		});
	};

	!years.length &&
		fetch("http://localhost/Stage-Jexlprod-Backend/Divers/GetYearsWithId.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id }),
		})
			.then(response => response.json())
			.then(data => {
				setYears(data);
			});

	useEffect(() => {
		dispatch({
			type: "SET_ANNEE_VENTES",
			payload: parseInt(annee),
		});
	}, []);

	return (
		<>
			<div className='header'>
				<Link to={"/collaborateurs"} className='btn-add'>
					<i className='material-icons'>arrow_back</i>
					<span>Retour</span>
				</Link>

				<Link className='btn-add' to={"/ventes/vente#nouvelle-vente"} state={{ id, annee, nouveau: true }}>
					<i className='material-icons'>playlist_add</i>
					<span>Ajouter une vente</span>
				</Link>

				<div className='annee-container'>
					<label htmlFor='annee' className='label-annee'>
						Année:
					</label>
					<select className='select-annee' name='annee' onChange={handleChange} value={anneeaffichage !== null && anneeaffichage}>
						{years.map(annee => {
							return (
								<option key={uuidv4()} value={annee}>
									{annee}
								</option>
							);
						})}
					</select>
				</div>
			</div>
			<SalesList />
		</>
	);
}
