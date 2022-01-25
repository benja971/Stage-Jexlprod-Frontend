import React from "react";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function LoginForm() {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = e => {
		e.preventDefault();
	};

	return (
		<form className='login-form' onSubmit={handleSubmit}>
			<div className='input-group'>
				<input type='text' name='' id='' className='input-field' placeholder='User id' required />
				<input type='password' name='' id='' className='input-field' placeholder='Enter password' required />
				<Link className='forgotten' to={"/"}>
					Mot de passe oublié ?
				</Link>
			</div>

			<div className='check-container'>
				<input type='checkbox' name='' id='' className='check-box' />
				<span className='pass-span'>Remember password</span>
			</div>

			<button type='submit' className='submit-btn'>
				Log in
			</button>
		</form>
	);
}
