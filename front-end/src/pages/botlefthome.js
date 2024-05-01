import styles from './botlefthome.module.css';
import commonStyles from './home.module.css';

function BotLeftHome() {
    return (
        <div className={[styles.BotLeft, commonStyles.BackGround].join(' ')}>
            <p>BotLeftHome</p>
        </div>
    );
}

export default BotLeftHome;