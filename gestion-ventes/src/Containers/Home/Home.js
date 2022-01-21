import React from "react";
import "./Home.css";
import CollabList from "../../Components/CollabList/List";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";

export default function Home() {
	const [annees, setAnnees] = useState([]);

	const dispatch = useDispatch();

	const handleChange = e => {
		dispatch({
			type: "SET_ANNEE_COLLABORATEURS",
			payload: parseInt(e.target.value),
		});
	};

	useEffect(() => {
		fetch("http://localhost/Stage-Jexlprod-Backend/Divers/GetYears.php", {
			method: "GET",
		})
			.then(response => response.json())
			.then(data => {
				if (data.length) {
					setAnnees(data);
					dispatch({
						type: "SET_ANNEE_COLLABORATEURS",
						payload: parseInt(data[0]),
					});
				} else {
					setAnnees([new Date().getFullYear().toString()]);
				}
			});
	}, []);

	return (
		<>
			<div className='header'>
				<Link
					className='btn-add'
					to={{
						pathname: "/collaborateur",
						state: {},
					}}
				>
					Ajouter un collaborateur
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
			<CollabList />
		</>
	);
}
