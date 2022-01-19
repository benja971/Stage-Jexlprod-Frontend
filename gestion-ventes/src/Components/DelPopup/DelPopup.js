import React from "react";
import "./DelPopup.css";
import { deleteCollaborateur } from "../../redux/collaborateurs/collaborateursReducer";
import { useDispatch, useSelector } from "react-redux";

export default function DelPopup() {
	const dispatch = useDispatch();

	const id = useSelector(state => state.delPopupReducer.id);

	console.log(id);

	const handleDelete = id => {
		dispatch(deleteCollaborateur(id));
		dispatch({
			type: "SET_INVISIBLE",
			payload: null,
		});
	};

	const handleCancel = () => {
		dispatch({
			type: "SET_INVISIBLE",
			payload: null,
		});
	};

	return (
		<div className='del-popup'>
			<div className='del-popup-content'>
				<h3>Voulez-vous vraiment supprimer ce collaborateur ?</h3>
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
