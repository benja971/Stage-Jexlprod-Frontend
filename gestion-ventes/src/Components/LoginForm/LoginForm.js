import React from "react";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logIn } from "../../redux/logged/loginReducer";

export default function LoginForm() {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const isLogged = useSelector(state => state.loginReducer.isLogged);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = e => {
		e.preventDefault();

		fetch("http://localhost:80/Stage-Jexlprod-Backend/Utilisateurs/login.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then(res => res.json())
			.then(data => {
				if (parseInt(data.success)) {
					dispatch(logIn());
				} else {
					console.log("Email ou mot de passe incorrect");
				}
			});
	};

	const handleChange = e => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		isLogged && navigate("/collaborateurs");
	}, [isLogged, navigate]);

	return (
		<form className='login-form' onSubmit={handleSubmit}>
			<div className='input-group'>
				<input type='email' name='email' className='input-field' placeholder='Entrez votre adresse email' onChange={handleChange} required />
				<input type='password' name='password' className='input-field' placeholder='Entrez votre mot de passe' onChange={handleChange} required />
				<Link className='forgotten' to={"/"}>
					Mot de passe oublié ?
				</Link>
			</div>

			{/* <div className='check-container'>
				<input type='checkbox' className='check-box' />
				<span className='pass-span'>Remember password</span>
			</div> */}

			<button type='submit' className='submit-btn'>
				Log in
			</button>
		</form>
	);
}
