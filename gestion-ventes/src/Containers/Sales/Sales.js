import React from "react";
import "./Sales.css";
import SalesList from "../../Components/SalesList/SalesList";
import { Link } from "react-router-dom";

export default function Sales() {
	return (
		<div>
			<div className='sales-header'>
				<Link
					className='btn-add-sale'
					to={{
						pathname: "./ajouter",
						state: {},
					}}
				>
					Ajouter une vente
				</Link>
			</div>
			<SalesList />
		</div>
	);
}
