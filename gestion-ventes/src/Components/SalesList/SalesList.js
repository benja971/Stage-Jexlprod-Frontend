import "./SalesList.css";
import { v4 as uuidv4 } from "uuid";
import Sale from "../Sale/Sale";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadVentes } from "../../redux/ventes/ventesReducer";
import { Link } from "react-router-dom";
import DelPopup from "../DelPopup/DelPopup";
import { useLocation } from "react-router";

export default function SalesList() {
	let id;
	try {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		id = useLocation().state.id;
	} catch (error) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		id = useSelector(state => state.ventesReducer);
	}

	const { ventes, annee } = useSelector(state => state.ventesReducer);
	const { isPopupVisible } = useSelector(state => state.delPopupReducer);

	const dispatch = useDispatch();

	const handleDelete = id_vente => {
		dispatch({
			type: "SET_VISIBLE_FROM_VENTE",
			payload: {
				isPopupVisible: true,
				id_collaborateur: id,
				id_vente,
				annee,
			},
		});
	};

	useEffect(() => {
		if (annee) dispatch(loadVentes(annee, id));
		console.log(id);
	}, [annee, id, dispatch]);

	return (
		<div>
			{isPopupVisible && <DelPopup location='Ventes' />}
			<table>
				<thead>
					<tr>
						<th>Collaborateur</th>
						<th>Libéllé</th>
						<th>Prix</th>
						<th>Date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{ventes.map(vente => {
						return (
							<Sale key={uuidv4()}>
								<td>{vente.collab}</td>
								<td>{vente.adresse}</td>
								<td>{parseFloat(vente.prix).toFixed(2)} €</td>
								<td>{vente.date}</td>
								<td id='action'>
									<Link to='/ventes/modifier' state={vente}>
										<i className='material-icons edit-icon'>mode_edit</i>
									</Link>
									<button
										onClick={() => {
											handleDelete(vente.id);
										}}
									>
										<i className='material-icons delete-icon'>delete</i>
									</button>
								</td>
							</Sale>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
