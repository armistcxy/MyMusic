import styles from "./homeright.module.css";

function HomeRight() {

    return (
        <div className={styles.IntoHR}>
            <section className={styles.FirstSec}> 
                <h1>Home</h1>   
                <div className={styles.PlayListCard}>
                    <div className={styles.ImgBox}> 
                        <img src="/img/mu.jpg" alt="Glory ManU"></img> 
                    </div> 
                    <div className={styles.Title}>
                        <p>Glory ManU</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomeRight;