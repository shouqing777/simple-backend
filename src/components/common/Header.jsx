import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">Simple Cloud Native</Link>
      </div>
      <nav className="header-nav">
        <ul>
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">首頁</Link>
          </li>
          <li className={location.pathname.includes("/users") ? "active" : ""}>
            <Link to="/users">用戶管理</Link>
          </li>
          <li className={location.pathname.includes("/orders") ? "active" : ""}>
            <Link to="/orders">訂單管理</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
