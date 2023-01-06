import styles from './Footer.module.css';
import logo_git from '../../assets/svg/eva_github-outline.svg';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className='container'>
        <p>
          Thyme © 2022
          <br /> Designed by Eugene Kovgan
        </p>
        <a target='_blank' href='https://github.com/EugeneKovgan'>
          <img className='svg-scale' src={logo_git} alt='logo_git' />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
