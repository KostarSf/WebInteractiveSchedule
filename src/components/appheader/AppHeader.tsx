import React, { useState } from 'react';
import logo from './logo.svg';
import styles from './AppHeader.module.css';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../app/userSlice';

interface Titles {
    title: string,
    subtitle: string
}

function AppHeader() {
    const [titles, setTitles] = useState<Titles>({
        title: 'Расписание', subtitle: ''
    });

    const user = useAppSelector(selectUser);

    if (user) {
        setTitles({
            title: user.study_group.name,
            subtitle: 'Расписание'
        })
    }

    return (
        <div className={styles.appHeader}>
            <img src={logo} className={styles.logo} alt='logo'/>
            <div className={styles.titleContainer}>
                <p className={styles.title}>{titles.title}</p>
                <p className={styles.subtitle}>{titles.subtitle}</p>
            </div>
        </div>
    );
}

export default AppHeader;
