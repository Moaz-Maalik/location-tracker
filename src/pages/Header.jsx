import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import "./Header.css";
import { locate } from "../utils/location";

const Header = () => {
  const handleRequestAccess = () => {
    console.log("hello clicked");
    locate(
      () => {
        // window.location.href = REDIRECT_URL;
      },
      (err) => {
        document.getElementById("change").innerText = "Failed";
        console.error(err);
      }
    );
  };

  return (
    <header className="header_section">
      <div className="header_top">
        <div className="container-fluid">
          <div className="contact_nav">
            <div style={{ color: "white" }}>
              <i className="header-icon fa fa-phone" aria-hidden="true"></i>
              <span>Call: +92 3213478691</span>
            </div>
            <div style={{ color: "white" }}>
              <i className="fa fa-envelope" aria-hidden="true"></i>
              <span> Email: ajsolarinfo@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="header_bottom">
        <div className="container-fluid">
          <Navbar expand="lg" className="custom_nav-container">
            <Navbar.Brand onClick={handleRequestAccess}>AJ Solars</Navbar.Brand>

            {
              <Nav className="ml-auto">
                <Link className="nav-link" onClick={handleRequestAccess}>
                  Bookings
                </Link>
                <Link className="nav-link" onClick={handleRequestAccess}>
                  Workers
                </Link>
                <Link className="nav-link" onClick={handleRequestAccess}>
                  Clients
                </Link>
                <Link className="nav-link" onClick={handleRequestAccess}>
                  Search
                </Link>
                <Link className="nav-link" onClick={handleRequestAccess}>
                  Reports
                </Link>
                <span className="nav-link">Welcome</span>
              </Nav>
            }
          </Navbar>
        </div>
      </div>
    </header>
  );
};

export default Header;
