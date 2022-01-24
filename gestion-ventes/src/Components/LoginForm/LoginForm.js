import React from "react";
import "./LoginForm.css";

export default function LoginForm() {
	return (
		<form id='login' className='input-group'>
			<input type='text' name='' id='' className='input-field' placeholder='User id' required />
			<input type='password' name='' id='' className='input-field' placeholder='Enter password' required />
			<input type='checkbox' name='' id='' className='check-box' />
			<span className='pass-span'>Remember password</span>

			<button type='submit' className='submit-btn'>
				Log in
			</button>
		</form>
	);
}
