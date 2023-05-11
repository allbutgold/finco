// Import styles and images
import styles from './Menu.module.scss';
import forward from "../../assets/img/forward.svg";
import toggle from "../../assets/img/toggle.png";
import feather from "../../assets/img/feather.svg";
import bell from "../../assets/img/bell.svg";
import helpcircle from "../../assets/img/helpcircle.svg";
// import settings from "../../assets/img/settings.svg";

// Import components
import Header from "../../components/Header/Header";
import SettingsButton from '../../components/Menu/SettingsButton';
import LogoutButton from '../../components/Menu/LogoutButton';


const handleLogout = () => {
  window.localStorage.clear();
  window.cookies.clear();
  window.location.href = "/login";
}

const Menu = () => {
  return (
    <section className={styles.Menu}>
      <Header name profile />

      <button><img src={feather} alt="feather" />My Wallet<img src={forward} alt="arrow" /></button>

      <div className={styles.divMiddle}>
        <button><img src={bell} alt="bell" />Notification<img src={toggle} alt="toggle" /></button>
        <SettingsButton />
        <button className={styles.btnMiddle}><img src={helpcircle} alt="help-circle" />FAQ<img src={forward} alt="arrow" /></button>
      </div>

      <div>
        <LogoutButton />
      </div>
    </section>

  );
}

export default Menu;
