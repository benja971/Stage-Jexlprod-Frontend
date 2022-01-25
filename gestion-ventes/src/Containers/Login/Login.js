import React from "react";
import LoginForm from "../../Components/LoginForm/LoginForm";
import "./Login.css";

export default function Login() {
	const handleClick = e => {
		e.preventDefault();
	};

	return (
		<div className='hero'>
			<div className='form-box'>
				<img src='https://img.netty.fr//logo/bucas//2/logo.png?cache=1636386340' alt='' />

				<LoginForm />
			</div>
		</div>
	);
}
