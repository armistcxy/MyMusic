import styles from "./playlistdetails.module.css";
import ClickPlayList from "../event/clickplaylist";

function PlayListDetails() {
    const { linkImg, nameSong, showImage, handleClick } = ClickPlayList();
    const thisComponent = (
        <div onClick={handleClick} className={styles.PlayListDetails}>
            <div className={styles.ImgBox}> 
                <img src={linkImg} alt={nameSong}></img> 
            </div> 
            <p>Click to play</p>
        </div>
    );
    
    return {thisComponent, linkImg, nameSong, showImage} 
}
export default PlayListDetails;
