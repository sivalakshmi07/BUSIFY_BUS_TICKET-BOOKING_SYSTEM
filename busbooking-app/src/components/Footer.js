import React from 'react';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="row">

          {/* BRAND */}
          <div className="col-md-4 mb-4">
            <h3 className="footer-brand">Busify</h3>
            <p className="footer-text">
              Busify helps you book bus tickets easily and comfortably
              through a reliable online platform.
            </p>

            {/* SOCIAL ICONS */}
            <div className="social-icons">
              <a
                href="https://www.instagram.com/Shiva_laksh_mi"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>

              <a
                href="https://github.com/sivalakshmi07"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/siva-lakshmi-4b28b3320"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* TOP ROUTES */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-heading">Top Reserved Routes</h5>
            <ul className="footer-list">
              <li>Aluva - Bangalore</li>
              <li>Ernakulam - Hyderabad</li>
              <li>Aluva - Trivandrum</li>
              <li>Bangalore - Mangalore</li>
              <li>Mangalore - Goa</li>
              <li>Jaipur - Agra</li>
            </ul>
          </div>

          {/* NEED HELP */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-heading">Need Help?</h5>
            <p className="footer-text">
              📧 sivalakshmips37@gmail.com
            </p>
            <p className="footer-text">
              📞 +91 8590340097
            </p>
          </div>

        </div>

        <hr className="footer-divider" />

        <p className="footer-bottom">
          © 2026 Busify. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
