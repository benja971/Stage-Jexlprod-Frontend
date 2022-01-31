import React, { useRef, useState, useEffect } from "react";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logIn } from "../../redux/logged/loginReducer";

export default function LoginForm() {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const password_input = useRef(null);
	const closed_eye = useRef(null);
	const opened_eye = useRef(null);

	const errorRef = useRef(null);

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
					errorRef.current.classList.remove("invisible");
				}
			});
	};

	const toggleVisibility = () => {
		closed_eye.current.classList.toggle("invisible");
		opened_eye.current.classList.toggle("invisible");
		password_input.current.type = password_input.current.type === "password" ? "text" : "password";
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
		<>
			<form className='login-form' onSubmit={handleSubmit}>
				<div className='input-group'>
					<input type='email' name='email' className='input-field' placeholder='Entrez votre adresse email' onChange={handleChange} required />
					<input ref={password_input} type='password' name='password' className='input-field' placeholder='Entrez votre mot de passe' onChange={handleChange} required />
					<p ref={errorRef} className='invisible'>
						Email ou mot de passe incorrect
					</p>
				</div>
				<i ref={closed_eye} id='closed_eye' className='icon-eye-close' onClick={toggleVisibility}></i>
				<i ref={opened_eye} id='opened_eye' className='icon-eye-open invisible' onClick={toggleVisibility}></i>
				<Link className='forgotten' to={"/"}>
					Mot de passe oublié ?
				</Link>
				{/* <div className='check-container'>
				<input type='checkbox' className='check-box' />
				<span className='pass-span'>Remember password</span>
			</div> */}
				<div className='login-btn-container'>
					<button type='submit' className='submit-btn'>
						Se connecter
					</button>
				</div>
			</form>
		</>
	);
}
