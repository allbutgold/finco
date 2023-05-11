import forward from "../../assets/img/forward.svg";
import settings from "../../assets/img/settings.svg";

const SettingsButton = () => {
    const handleSettings = () => {
        window.location.href = "/setup";
    };

    return <button onClick={handleSettings}><img src={settings} alt="arrow" />Settings<img src={forward} alt="arrow" /></button>;
};

export default SettingsButton;