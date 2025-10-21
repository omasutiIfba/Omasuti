import React from 'react';
import { Link } from 'react-router-dom';
import logo from './Logo-2.png';
import './header.css';

const Header = () => {
  return (
    <header className="app-header">
      <Link to="/" className="logo-link">
        <img src={logo} alt="OMASUTI" className="logo-img" />
      </Link>
      <nav className="header-nav">
        <Link to="/sobre">Sobre</Link>
        <Link to="/jogos">Jogos</Link>
      </nav>
    </header>
  );
};

export default Header;