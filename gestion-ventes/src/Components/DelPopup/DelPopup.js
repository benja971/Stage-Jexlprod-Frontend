import React from "react";
import "./DelPopup.css";
import { deleteCollaborateur } from "../../redux/collaborateurs/collaborateursReducer";
import { deleteVente } from "../../redux/ventes/ventesReducer";
import { useDispatch, useSelector } from "react-redux";

export default function DelPopup(props) {
	const dispatch = useDispatch();

	const { id_collaborateur, id_vente, annee } = useSelector(state => state.delPopupReducer);

	const handleDeleteCollaborateur = (id_collaborateur, annee) => {
		dispatch(deleteCollaborateur(id_collaborateur, annee));
		setInvisible();
	};

	const handleDeleteVente = (id_vente, annee, id_collaborateur) => {
		dispatch(deleteVente(id_vente, annee, id_collaborateur));
		setInvisible();
	};

	const setInvisible = () => {
		dispatch({
			type: "SET_INVISIBLE",
		});
	};

	return (
		<div className='del-popup'>
			<div className='del-popup-content'>
				<h3>Voulez-vous vraiment supprimer {props.location === "Collaborateurs" ? "ce collaborateur " : "cette vente "} ?</h3>
				<div className='del-popup-buttons'>
					<button
						className='del-popup-button yes'
						onClick={() => {
							props.location === "Collaborateurs" ? handleDeleteCollaborateur(id_collaborateur, annee) : handleDeleteVente(id_collaborateur, annee, id_vente);
						}}
					>
						Oui
					</button>
					<button className='del-popup-button no' onClick={setInvisible}>
						Non
					</button>
				</div>
			</div>
		</div>
	);
}
