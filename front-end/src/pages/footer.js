import styles from './footer.module.css';
import PlaySong from '../event/playsong';

function Footer(props){
    const { linkImg, nameSong, showImage } = props;
    const { handlePlaySong } = PlaySong();
    let tmp = ">";
    let func = "?";

    return (
        <footer className={styles.PlayTrack}>
            { showImage && (
                <div className={styles.FooterLeft}>
                    <img src={ linkImg } alt={ nameSong } className={styles.ImgBox} />
                    <p>{ nameSong }</p>
                </div>    
            )}
            { showImage && (
                <div onClick={ handlePlaySong } className={styles.ButtonPlay}>
                    <p>{ tmp }</p>
                </div> 
            )}
            <div>
                <p>{ func }</p>
            </div>
        </footer>
    );
}

export default Footer;