import React from "react";
import "./Home.css";
import CollabList from "../../Components/CollabList/List";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
	const [annee, setAnnee] = useState(new Date().getFullYear());

	const handleChange = e => setAnnee(parseInt(e.target.value));

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
					<select className='select-annee' name='annee' value={annee} onChange={handleChange}>
						<option value='2018'>2018</option>
						<option value='2019'>2019</option>
						<option value='2020'>2020</option>
						<option value='2021'>2021</option>
						<option value='2022'>2022</option>
					</select>
				</div>
			</div>
			<CollabList />
		</>
	);
}
