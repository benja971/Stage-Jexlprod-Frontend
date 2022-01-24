import React from "react";
import "./RegisterForm.css";

export default function RegisterForm() {
	return (
		<form id='register' className='input-group'>
			<input type='text' className='input-field' placeholder='User id' required />
			<input type='email' className='input-field' placeholder='Email' required />
			<input type='text' className='input-field' placeholder='Enter password' required />

			<input type='submit' value='Register' className='submit-btn register' />
		</form>
	);
}
