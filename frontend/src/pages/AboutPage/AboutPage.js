// pages/HomePage.jsx
import React from 'react';
import './aboutPage.css';
import logo from './Logo-2.png';

const AboutPage = () => {
  return (
    <div className="aboutpage-background">
      <div className="full-width-box">
        <div className="content-wrapper">
          <img src={logo} alt="OMASUTI Logo" className="logo-aboutpage" />
          <div className="text-content">
            <h5>Sobre o projeto</h5>
            <p>
            O Omasuti nasceu com a missão de facilitar nas intervenções em crianças com TEA, criando atividades que apoiam tanto profissionais quanto familiares nesse processo.
            Curiosamente, o nome "Omasuti" é uma brincadeira inteligente com a palavra "autismo", reorganizando-as em um anagrama criativo e significativo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;

/**
 * <h5>O Omasuti nasceu com a missão de facilitar nas intervenções em crianças com TEA, criando atividades que apoiam tanto profissionais quanto familiares nesse processo.
            Curiosamente, o nome "Omasuti" é uma brincadeira inteligente com a palavra "autismo", reorganizando-as em um anagrama criativo e significativo.</h5>
            <p>Desenvolvido em React e Spring Boot, o projeto prioriza acessibilidade e contém customização de cenários educacionais.</p>
 */