import './index.css';
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


let Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const loginHandler = (e) => {
     // e.preventDefault();


      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              console.log("login successful: ", user);
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log("firebase login error: ", errorCode, errorMessage);
          });


  }
  
    return <div className="login">
        <div className="leftDiv">

        </div>
        <div className="rightDiv">
            <h1>Login to continue</h1>
            <div className='ep'>

                <input type="email" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }}/>
                <input type="password"  className='pass' placeholder='Pass' onChange={(e) => { setPassword(e.target.value) }}  />
            </div>
            <div className='rf'>
              <div className='r'>
                <input type="checkbox" /> <span>Remember me</span>
                
              </div>
              <div className='f'>

                <a href="#">Forgot Password?</a>
              </div>
            </div>

            <button type='submit' onClick={loginHandler}>Login</button>
        </div>
    </div>
}

export default Login;