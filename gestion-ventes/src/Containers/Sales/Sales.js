import React from "react";
import "./Sales.css";
import SalesList from "../../Components/SalesList/SalesList";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";

export default function Sales() {
	const dispatch = useDispatch();

	const [annees, setAnnees] = useState([]);

	const handleChange = e => {
		dispatch({
			type: "SET_ANNEE_VENTES",
			payload: parseInt(e.target.value),
		});
	};

	useEffect(() => {
		fetch("http://localhost/Stage-Jexlprod-Backend/Divers/GetYears.php", {
			method: "GET",
		})
			.then(response => response.json())
			.then(data => {
				setAnnees(data);
				dispatch({
					type: "SET_ANNEE_VENTES",
					payload: parseInt(data[0]),
				});
			});
	}, []);

	return (
		<>
			<div className='header'>
				<Link
					className='btn-add'
					to={{
						pathname: "./ajouter",
						state: {},
					}}
				>
					Ajouter une vente
				</Link>
				<div className='annee-container'>
					<label htmlFor='annee' className='label-annee'>
						Année:
					</label>
					<select className='select-annee' name='annee' onChange={handleChange}>
						{annees.map(annee => {
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
