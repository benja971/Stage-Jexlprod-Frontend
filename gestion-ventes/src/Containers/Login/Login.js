import React from "react";
import LoginForm from "../../Components/LoginForm/LoginForm";
import RegisterForm from "../../Components/RegisterForm/RegisterForm";
import { useRef } from "react";
import "./Login.css";

export default function Login() {
	const btn = useRef(null);
	const [isLogin, setIsLogin] = React.useState(true);

	const handleClick = e => {
		e.preventDefault();
		setIsLogin(!isLogin);
		btn.current.classList.toggle("register", isLogin);
	};

	return (
		<div className='hero'>
			<div className='form-box'>
				<div className='btn-box' onClick={handleClick}>
					<div ref={btn} className='btn'></div>
					<button className='toggle-btn'>Log In</button>
					<button className='toggle-btn'>Register</button>
				</div>

				<img src='https://img.netty.fr//logo/bucas//2/logo.png?cache=1636386340' alt='' />

				{isLogin && <LoginForm />}
				{!isLogin && <RegisterForm />}
			</div>
		</div>
	);
}
