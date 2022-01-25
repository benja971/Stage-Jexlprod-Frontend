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
	const { isPopupVisible } = useSelector(state => state.delPopupReducer);

	const dispatch = useDispatch();

	const handleDelete = (id, annee) => {
		dispatch({
			type: "SET_VISIBLE",
			payload: { id, annee },
		});
	};

	useEffect(() => {
		annee && dispatch(loadCollaborateurs(annee));
	}, [annee, dispatch]);

	return (
		<>
			{isPopupVisible && <DelPopup location='Collaborateurs' />}
			<table>
				<thead>
					<tr>
						<th>Nom</th>
						<th>Prénom</th>
						<th>Volume HT</th>
						<th>Volume TTC</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{collaborateurs.map(collab => {
						return (
							<tr key={uuidv4()}>
								<td>{collab.nom}</td>
								<td>{collab.prenom}</td>
								<td>
									<Link className='euro' to={`/ventes#${collab.nom}-${collab.prenom}`} state={{ id: collab.id, annee }}>
										{parseFloat(collab.volume).toFixed(2)}€
									</Link>
								</td>
								<td>
									<Link className='euro' to={`/ventes#${collab.nom}-${collab.prenom}`} state={{ id: collab.id, annee }}>
										{parseFloat(collab.volume).toFixed(2) * 0.8}€
									</Link>
								</td>
								<td id='action'>
									<Link to={`/collaborateurs/collaborateur#${collab.nom}-${collab.prenom}`} state={{ collaborateur: collab }}>
										<i className='material-icons edit-icon'>mode_edit</i>
									</Link>
									<button onClick={() => handleDelete(collab.id, annee)}>
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
