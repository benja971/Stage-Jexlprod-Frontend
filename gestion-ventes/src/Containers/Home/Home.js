import React from "react";
import "./Home.css";
import CollabList from "../../Components/CollabList/List";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
	const [annees, setAnnees] = useState([]);

	const handleChange = e => setAnnees(parseInt(e.target.value));

	useEffect(() => {
		fetch("http://localhost/Stage-Jexlprod-Backend/Divers/GetYears.php", {
			method: "GET",
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				setAnnees(data);
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
