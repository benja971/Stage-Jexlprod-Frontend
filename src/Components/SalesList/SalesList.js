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
	if (id === undefined) {
		try {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			id = useLocation().state.id;
		} catch (error) {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			id = parseInt(useLocation().state.vente.collaborateur);
		}
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
		annee && dispatch(loadVentes(annee, id));
	}, [annee, id, dispatch]);

	return (
		<div>
			{isPopupVisible && <DelPopup location='Ventes' />}
			<table className='salesList'>
				<thead>
					<tr>
						<th>Libéllé</th>
						<th>Frais d'agence HT</th>
						<th>Commissions HT</th>
						<th>Commissions TTC</th>
						<th>Date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{ventes.map(vente => {
						return (
							<Sale key={uuidv4()}>
								<td>{vente.adresse}</td>
								<td>{vente.frais_agence} €</td>
								<td>{parseFloat(vente.commission_ht).toFixed(2)} €</td>
								<td>{parseFloat(vente.commission_ttc).toFixed(2)} €</td>
								<td>{vente.date}</td>
								<td id='action'>
									<Link to={`/ventes/vente#${vente.collab}`.replace(" ", "-")} state={{ vente, nouveau: false }}>
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
