import React from 'react';
import logo from './logo.svg';
import styles from './AppHeader.module.css';

function AppHeader() {

    return (
        <div className={styles.appHeader}>
            <img src={logo} className={styles.logo} />
            <div className={styles.titleContainer}>
                <p className={styles.title}>ИСИТ 2121</p>
                <p className={styles.subtitle}>расписание</p>
            </div>
        </div>
    );
}

export default AppHeader;
