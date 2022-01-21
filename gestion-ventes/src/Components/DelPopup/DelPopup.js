import React from "react";
import "./DelPopup.css";
import { deleteCollaborateur } from "../../redux/collaborateurs/collaborateursReducer";
import { deleteVente } from "../../redux/ventes/ventesReducer";
import { useDispatch, useSelector } from "react-redux";

export default function DelPopup(props) {
	const dispatch = useDispatch();

	const id = useSelector(state => state.delPopupReducer.id);
	const { annee } = useSelector(state => state.collaborateursReducer);

	const handleDelete = id => {
		props.location === "Collaborateurs" ? dispatch(deleteCollaborateur(id, annee)) : dispatch(deleteVente(id, annee));

		dispatch({
			type: "SET_INVISIBLE",
		});
	};

	const handleCancel = () => {
		dispatch({
			type: "SET_INVISIBLE",
		});
	};

	return (
		<div className='del-popup'>
			<div className='del-popup-content'>
				<h3>Voulez-vous vraiment supprimer {props.location === "Collaborateurs" ? "ce collaborateur " : "cette vente "} ?</h3>
				<div className='del-popup-buttons'>
					<button className='del-popup-button yes' onClick={() => handleDelete(id)}>
						Oui
					</button>
					<button className='del-popup-button no' onClick={handleCancel}>
						Non
					</button>
				</div>
			</div>
		</div>
	);
}
