import styles from "./toplefthome.module.css";
import commonStyles from './home.module.css';
import { Link } from "react-router-dom";

import { ReactComponent  as HomeLogo } from '../data/icons/home.svg';
import { ReactComponent  as SearchLogo } from '../data/icons/search.svg';

function TopLeftHome() {
    

    return (
        <div className={[styles.TopLeft, commonStyles.BackGround].join(' ')}>
            <ul className={styles.IntoTopLeft}>
                <li>
                    <Link to="/" className={styles.NavigatingLink}>
                        <HomeLogo/>
                        <p className={styles.TextElement}>Home</p>
                    </Link>
                </li>
                <li>
                    <Link to="/search" className={styles.NavigatingLink}>
                        <SearchLogo/>
                        <p className={styles.TextElement}>Search</p>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default TopLeftHome;