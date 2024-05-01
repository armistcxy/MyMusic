import styles from "./homeright.module.css";

import PlayListCard from '../components/playlistcard';

function HomeRight() {

    return (
        <div className={styles.IntoHR}>
            <section className={styles.FirstSec}> 
                <h1>Home</h1> 
                <PlayListCard/> 
            </section>
        </div>
    );
}

export default HomeRight;