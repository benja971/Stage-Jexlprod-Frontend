import "./SalesList.css";
import { v4 as uuidv4 } from "uuid";
import Sale from "../Sale/Sale";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadVentes } from "../../redux/ventes/ventesReducer";
import { Link } from "react-router-dom";

export default function SalesList() {
	const ventes = useSelector(state => state.ventesReducer.ventes);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadVentes());
	}, []);

	console.log(ventes);

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Id</th>
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
								<td>{vente.id}</td>
								<td>{vente.adresse}</td>
								<td>{vente.prix} €</td>
								<td>{vente.date}</td>
								<td id='action'>
									<Link to='./modifier'>
										<i className='material-icons edit-icon'>mode_edit</i>
									</Link>
									<button onClick={() => {}}>
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
