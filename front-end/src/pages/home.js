import styles from './home.module.css';
import HomeRight from './homeright';
import HomeRightSearch from './hrsearch';
import TopLeftHome from './toplefthome';
import Footer from './footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BotLeftHome from './botlefthome';

function Home(){
    const tmp = "< >";

    return (
        <Router>
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
                        </Routes>
                    </nav>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default Home;