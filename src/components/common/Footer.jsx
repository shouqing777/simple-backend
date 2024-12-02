import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>關於我們</h4>
          <p>Simple Cloud Native Demo Project</p>
        </div>
        <div className="footer-section">
          <h4>聯繫方式</h4>
          <p>Email: contact@example.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Simple Cloud Native. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
