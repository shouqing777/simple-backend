import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">首頁</Link>
            </li>
            <li>
              <Link to="/users">用戶管理</Link>
            </li>
            <li>
              <Link to="/orders">訂單管理</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2024 Simple Cloud Native</p>
      </footer>
    </div>
  );
};

export default Layout;
