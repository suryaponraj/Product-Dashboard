import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useState} from "react";
import GoogleLogin from "react-google-login";
import './Signin.css'
import { Apple,GoogleLoginBtn } from "./Icons";
import { gapi } from "gapi-script";
function Signin(){
	const clientId='272370333582-lv0v5rkna0g686dun0rnlai3gd28lh1q.apps.googleusercontent.com'
	useEffect(()=>{
		gapi.load("client:auth2",()=>{
			gapi.auth2.init({clientId:clientId})
		})
	})
	const navigate=useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	localStorage.setItem('username','demo@gmail.com');
	localStorage.setItem('password','demo');
	function handleSubmit(e) {
		e.preventDefault();
		// Check if username and password match stored values
		const storedUsername = localStorage.getItem('username');
		const storedPassword = localStorage.getItem('password');
		if (username === storedUsername && password === storedPassword) {
		  navigate('dashboard');
		  // Store isLoggedIn in local storage or cookie
		  localStorage.setItem('isLoggedIn', true);
		}else {
			alert("Credentials are not Match!!");
		}
	  }
    
	const onSuccess=(res)=>{
		localStorage.setItem('gmailLogin',true);
		 navigate('dashboard');
		 console.log('logged in');
		 console.clear();
	}
	const onFailure=(res)=>{
		 if (res.error === "popup_closed_by_user") {
			alert("Authentication window closed by user. Please try again.");
		   }
	
	}
    return(
		
        <div className="main-div">
			
            {/* <div className="left-div">
            <h2 className="heading"> Product .</h2>
            </div> */}
            <div className="right-div">
            <div className='sign-in-box'>
						<div className='right-box'>
                        <div className='Si'> 
                        Sign in
                        </div>
                        
                        <div className="p">Sign in to your account</div>
                        <div className="authentication-buttons">
							<div className="parent-class">
						<GoogleLogin 
						clientId={clientId} buttonText='Sign in with Google' 
							onSuccess={onSuccess} onFailure={onFailure}
							cookiePolicy="single_host_origin"
							isSignedIn={true}
							className="custom-google-login"
							render={renderProps => (
        <button className="custom-google-login" onClick={renderProps.onClick} disabled={renderProps.disabled}>
          <GoogleLoginBtn className="custom-google-icon" />
          Login with Google
        </button>
      )}
							
						/>
						</div>
                        <button className="button-1">
                        < Apple /> Sign in with Apple</button>
                        </div>
						<form onSubmit={handleSubmit} className="input-fields">
                        {/* <div > */}
							<div className='input-container'>
                                <div className="labelname">Email Address</div>
								<input
								    className="email-box"
									placeholder='someone@example.com'
									fullWidth
									type='text'
									label='Email address'
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div className='input-container'>
                                <div className="labelname">Password</div>
								<input
								className="password-box"
									fullWidth
									type={'password'}
									value={password}
									label='Password'
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							

							<div className='login-checkbox-desc-holder '>
								<div className='checkbox-holder'>
								</div>
							</div>
                            <div className='forgot-password'>
									<a className="link" >Forgot Password?</a>
								</div>
							<div className='button-container'>
								<button
								    
									className='login-btn'
									
									type='submit'
									>
									Sign In
								</button>
							</div>
							
                            {/* </div> */}
							</form>

								<p className='body2'>
									Don’t have an account?  
                                    <a className="link"> Register Here</a>
								</p>	
						</div>
					</div>

            </div>
         <Outlet />
        </div>
    )
}
export default Signin;