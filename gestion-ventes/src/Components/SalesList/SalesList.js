import React from "react";
import "./SalesList.css";
import { v4 as uuidv4 } from "uuid";
import Sale from "../Sale/Sale";

export default function SalesList() {
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
					<Sale uuid={uuidv4()}></Sale>
				</tbody>
			</table>
		</div>
	);
}
