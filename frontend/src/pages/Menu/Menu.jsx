import styles from './Menu.module.scss';
import Header from "../../components/Header/Header";
import LogoutButton from '../../components/Menu/LogoutButton';

// import { userStore } from '../../utils/userStore';

const handleLogout = () => {
  window.localStorage.clear();
  window.cookies.clear();
  window.location.href = "/login";
}

const Menu = () => {
  return (
    <section className={styles.Menu}>
      <Header name />
      <div>My Wallet</div>

      <div>
        <div>Notification</div>
        <div>Settings</div>
        <div>FAQ</div>
      </div>

      <div><LogoutButton onClick={handleLogout} /></div>
    </section>

  );
}

export default Menu;
