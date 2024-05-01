import styles from "./playlistcard.module.css";
import { Link } from "react-router-dom";

function PlayListCard() {
    return (
        <Link to="/playlistdetails">
            <div className={styles.PlayListCard}>
                <div className={styles.ImgBox}> 
                    <img src="/data/img/mu.jpg" alt="Glory ManU"></img> 
                </div> 
                <div className={styles.Title}>
                    <p>Glory ManU</p>
                </div>
            </div> 
        </Link>
    );
}

export default PlayListCard;