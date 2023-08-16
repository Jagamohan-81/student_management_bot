import React from "react";
import "./Footer.css"; // Import your CSS file for styling

const Footer = () => {
  return (
    <footer className="footer-container ">
      <div className="footer-content flex flex-col sm:flex-row justify-between items-center px-4 py-2">
        <div className="footer-logo text-2xl font-bold mb-2 sm:mb-0 sm:mr-4">
          School Management System
        </div>
        <div className="footer-links flex flex-row justify-around">
          <a
            href="/about"
            className=" mx-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full"
          >
            About
          </a>
          <a
            href="/contact"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full"
          >
            Contact
          </a>
          <a
            href="/terms"
            className=" mx-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full"
          >
            Terms of Use
          </a>
        </div>
      </div>
      <div className="footer-bottom pb-2">
        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
