import { auth, googleProvider } from "../config/firebase-config"
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useState } from 'react'



const Auth = () => {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
      console.error(err)
    }
  };

  const signInWGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      console.error(err);
    }
  }

  const logOut = async () => {
    try { await auth.signOut() } catch (err) { console.error(err) }
  }

  return (
    <div className="background deactive">
      <div className="login-wrapper deactive">
      <input type="email" name="email" id="email" placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input type="password" name="password" id="pass" placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={signIn}>Sign in
      </button>
      <button 
        onClick={signInWGoogle}>Sign In With Google</button>
      <button 
        onClick={logOut}>Log Out</button>
    </div>
    </div>


  );
}

export default Auth;