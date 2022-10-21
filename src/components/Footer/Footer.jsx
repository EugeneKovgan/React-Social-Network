import styles from './Footer.module.css';
import logo_git from '../../assets/svg/eva_github-outline.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className='container'>
        <div className={styles.footer_container}>
          <p>
            Thyme © 2022
            <br /> Designed by Eugene Kovgan
          </p>
          <img className='svg-scale' src={logo_git} alt='logo_git' />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
