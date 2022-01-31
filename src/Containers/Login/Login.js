import React from "react";
import LoginForm from "../../Components/LoginForm/LoginForm";
import "./Login.css";

export default function Login() {
	const handleClick = e => {
		e.preventDefault();
	};

	return (
		<div className='hero'>
			<div id='un' className='deco'></div>
			<div id='deux' className='deco'></div>
			<div id='trois' className='deco'></div>
			<div id='quatre' className='deco'></div>
			<div className='form-box'>
				<img src='https://img.netty.fr//logo/bucas//2/logo.png?cache=1636386340' alt='' />

				<LoginForm />
			</div>
		</div>
	);
}
