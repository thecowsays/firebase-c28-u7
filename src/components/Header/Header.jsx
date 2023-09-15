import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebaseConfig";

import "./Header.css";
import { signOut } from "firebase/auth";

const Header = () => {
  const categories = ["Health", "Food", "Travel", "Technology"];

  const navigate = useNavigate();

  // get user data
  const [user] = useAuthState(auth);

  return (
    <div className="header-container">
      <FaHome onClick={() => navigate("/")} />
      <div className="categories-container">
        {categories.map((item) => (
          <Link className="nav-link" to={`/category/${item}`} key={item}>
            {item}
          </Link>
        ))}
      </div>

      {user ? (
        <div>
          <span className="username">{user?.displayName}</span>
          <button className="auth-link" onClick={() => signOut(auth)}>
            Logout
          </button>
        </div>
      ) : (
        <Link to="/auth" className="auth-link">
          Signup
        </Link>
      )}
    </div>
  );
};

export default Header;
