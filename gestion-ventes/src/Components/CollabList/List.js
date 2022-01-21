import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadCollaborateurs } from "../../redux/collaborateurs/collaborateursReducer";
import { Link } from "react-router-dom";
import DelPopup from "../DelPopup/DelPopup";
import "./List.css";

export default function CollabList() {
	const { collaborateurs, annee } = useSelector(state => state.collaborateursReducer);
	const isPopupVisible = useSelector(state => state.delPopupReducer.isPopupVisible);

	const dispatch = useDispatch();

	const handleDelete = (id, annee) => {
		dispatch({
			type: "SET_VISIBLE",
			payload: { id, annee },
		});
	};

	useEffect(() => {
		dispatch(loadCollaborateurs(annee));
	}, [annee, dispatch]);

	return (
		<>
			{isPopupVisible && <DelPopup location='Collaborateurs' />}
			<table>
				<thead>
					<tr>
						<th>Nom</th>
						<th>Prénom</th>
						<th>Volume</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{collaborateurs.map(i => {
						return (
							<tr key={uuidv4()}>
								<td>{i.nom}</td>
								<td>{i.prenom}</td>
								<td>
									{parseFloat(i.volume).toFixed(2)}
									<Link className='euro' to={"/"}>
										€
									</Link>
								</td>
								<td id='action'>
									<Link to='/collaborateur' state={{ collaborateur: i }}>
										<i className='material-icons edit-icon'>mode_edit</i>
									</Link>
									<button onClick={() => handleDelete(i.id, annee)}>
										<i className='material-icons delete-icon'>delete</i>
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}
