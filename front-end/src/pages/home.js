import styles from './home.module.css';
import { Route, Routes } from 'react-router-dom';

import BotLeftHome from './botlefthome';
import HomeRight from './homeright';
import HomeRightSearch from './hrsearch';
import TopLeftHome from './toplefthome';
import Footer from './footer';

import PlayListDetails from "../components/playlistdetails";

function Home(){
    const tmp = "< >";
    const { thisComponent : PLDetailsCP, linkImg, nameSong, showImage } = PlayListDetails();

    return (
        <div className={styles.fullscreen}>
            <div className={styles.Home}>
                <nav className={styles.HomeLeft}>
                    <TopLeftHome/>  
                    <BotLeftHome/>
                </nav>
            
                <nav className={[styles.HomeRight, styles.BackGround].join(' ')}>
                    <header className={styles.HeaderRight}>
                        <p>{ tmp }</p>
                        <p>O</p>
                    </header>
                    <Routes>
                        <Route path='/' element={<HomeRight/>}/>
                        <Route path='/search' element={<HomeRightSearch/>}/>
                        <Route path='/playlistdetails' element={PLDetailsCP}/>
                    </Routes>
                </nav>
            </div>
            {console.log(linkImg + " " + nameSong + " " + showImage)}
            <Footer linkImg={linkImg} nameSong={nameSong} showImage={showImage}/>
        </div>
    );
}

export default Home;