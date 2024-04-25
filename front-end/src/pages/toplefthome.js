import styles from "./toplefthome.module.css";
import commonStyles from './home.module.css';
import { Link } from "react-router-dom";

function TopLeftHome() {
    

    return (
        <div className={[styles.TopLeft, commonStyles.BackGround].join(' ')}>
            <ul className={styles.IntoTopLeft}>
                <li>
                    <Link to="/">
                        <span className={styles.TextElement}>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/search">
                        <span className={styles.TextElement}>Search</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default TopLeftHome;