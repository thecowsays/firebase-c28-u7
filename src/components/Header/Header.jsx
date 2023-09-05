import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

import "./Header.css";

const Header = () => {
  const categories = ["Health", "Food", "Travel", "Technology"];

  return (
    <div className="header-container">
      <FaHome />
      <div className="categories-container">
        {categories.map((item) => (
          <Link className="nav-link" to={`/category/${item}`} key={item}>
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
