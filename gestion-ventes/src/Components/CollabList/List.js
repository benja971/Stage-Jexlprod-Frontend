import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadCollaborateurs, deleteCollaborateur } from "../../redux/collaborateurs/collaborateursReducer";
import { Link } from "react-router-dom";
import "./List.css";

export default function CollabList() {
	const collaborateurs = useSelector(state => state.collaborateursReducer.collaborateurs);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadCollaborateurs());
	}, []);

	return (
		<table>
			<thead>
				<tr>
					<th>Nom</th>
					<th>Prénom</th>
					<th>Volume</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{collaborateurs.map(i => (
					<tr key={uuidv4()}>
						<td>{i.nom}</td>
						<td>{i.prenom}</td>
						<td>
							{i.volume}
							<Link className='euro' to={"/"}>
								€
							</Link>
						</td>
						<td id='action'>
							<Link to='/collaborateur' state={{ collaborateur: i }}>
								<i className='material-icons edit-icon'>mode_edit</i>
							</Link>
							<button onClick={() => dispatch(deleteCollaborateur(i.id))}>
								<i className='material-icons delete-icon'>delete</i>
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
