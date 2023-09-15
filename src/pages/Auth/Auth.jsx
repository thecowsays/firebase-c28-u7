import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

import "./Auth.css";

const Auth = () => {
  const [existingUser, setExistingUser] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault(); // prevents page from refreshing

    // creating users (registering)
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        //   console.log(res.user);
        updateProfile(auth.currentUser, { displayName: name });
        navigate("/");
      })
      .catch((err) => alert(err.code));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // login
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => alert(err.com));
  };

  return (
    <div className="auth-container">
      {existingUser ? (
        <form className="auth-form" onSubmit={handleLogin}>
          <h1>Login with your email</h1>
          <div className="form-group">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              placeholder="Enter your email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit">Login</button>
          <p>
            Don&apos;t have an account?&nbsp;
            <span className="form-link" onClick={() => setExistingUser(false)}>
              Signup!
            </span>
          </p>
        </form>
      ) : (
        <form className="auth-form" onSubmit={handleSignup}>
          <h1>Signup with your email</h1>
          <div className="form-group">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              required
              placeholder="What's your name?"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              placeholder="Enter your email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              placeholder="Choose a password"
            />
          </div>
          <button type="submit">Register</button>
          <p>
            Already have an account?&nbsp;
            <span className="form-link" onClick={() => setExistingUser(true)}>
              Login
            </span>
            .
          </p>
        </form>
      )}
    </div>
  );
};

export default Auth;
