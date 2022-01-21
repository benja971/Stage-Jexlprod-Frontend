import "./SalesList.css";
import { v4 as uuidv4 } from "uuid";
import Sale from "../Sale/Sale";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadVentes } from "../../redux/ventes/ventesReducer";
import { Link } from "react-router-dom";
import DelPopup from "../DelPopup/DelPopup";

export default function SalesList() {
	const { ventes, annee } = useSelector(state => state.ventesReducer);
	const { isPopupVisible } = useSelector(state => state.delPopupReducer);

	const dispatch = useDispatch();

	const handleDelete = (id, annee) => {
		dispatch({
			type: "SET_VISIBLE",
			payload: {
				id,
				annee,
			},
		});
	};

	useEffect(() => {
		dispatch(loadVentes(annee));
	}, [annee]);

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
											handleDelete(vente.id, annee);
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
