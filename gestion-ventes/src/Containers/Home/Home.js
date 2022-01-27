import React from "react";
import "./Home.css";
import CollabList from "../../Components/CollabList/List";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
	const isLogged = useSelector(state => state.loginReducer.isLogged);
	// if (!isLogged) window.location.href = "/";

	const [annees, setAnnees] = useState([]);

	const dispatch = useDispatch();

	const handleChange = e => {
		dispatch({
			type: "SET_ANNEE_COLLABORATEURS",
			payload: parseInt(e.target.value),
		});
	};

	useEffect(() => {
		fetch("http://localhost/Stage-Jexlprod-Backend/Divers/GetAllYears.php", {
			method: "GET",
		})
			.then(response => response.json())
			.then(data => {
				if (data.length > 0) {
					setAnnees(data);
					dispatch({
						type: "SET_ANNEE_COLLABORATEURS",
						payload: parseInt(data[0]),
					});
				} else {
					const annee = parseInt(new Date().getFullYear());
					setAnnees([annee]);
					dispatch({
						type: "SET_ANNEE_COLLABORATEURS",
						payload: annee,
					});
				}
			});
	}, [dispatch]);

	return (
		<div onLoad={e => e.preventDefault()}>
			<div className='header'>
				<Link
					className='btn-add'
					to={{
						pathname: "/collaborateurs/collaborateur",
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
		</div>
	);
}
