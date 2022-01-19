import React from "react";

export default function Sale(props) {
	return <tr key={props.uuid}>{props.children}</tr>;
}
