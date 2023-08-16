import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header-container flex flex-col sm:flex-row justify-between items-center px-4 py-2 me-5">
      <h3 className="logo text-2xl font-bold mb-2 sm:mb-0 sm:mr-4">
        Knowledge Hub
      </h3>
      <nav className="nav-links flex flex-col sm:flex-row justify-end mx-5">
        <div className="flex justify-center m-2"></div>
        <div className="flex justify-around items-center m-2">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
