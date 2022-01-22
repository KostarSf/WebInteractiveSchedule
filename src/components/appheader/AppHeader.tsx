import React, { useEffect, useState } from 'react';
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
        title: 'Расписание', subtitle: '  '
    });

    const user = useAppSelector(selectUser);

    useEffect(() => {
        user && setTitles({
            title: user.study_group.name,
            subtitle: 'Расписание'
        })
    }, [user])

    return (
        <div className={styles.appHeaderContainer}>
            <div className={styles.appHeader}>
                <img src={logo} className={styles.logo} alt='logo'/>
                <div className={styles.titleContainer}>
                    <p className={styles.title}>{titles.title}</p>
                    <p className={styles.subtitle}>{titles.subtitle}</p>
                </div>
            </div>
        </div>
    );
}

export default AppHeader;
