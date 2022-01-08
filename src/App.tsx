import AppHeader from './components/appheader/AppHeader';
import ScheduleView from './components/schedule/ScheduleView';
import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { FetchUserByToken } from './app/api';
import { useAppDispatch } from './app/hooks';
import { set } from './app/userSlice';

function App() {
    const dispatch = useAppDispatch();

    const [headless, setHeadless] = useState(false);

    useEffect(() => {
        const userToken = 'XVlBzgbaiCMRAjWwhTHctcuAxhxKQFDaFpLSjFbc';
        FetchUserByToken(userToken, (user) => {
            dispatch(set(user));
        });
    })

    const currentView = <ScheduleView />;

    return (
        <div className={styles.App}>
            <header>
                {!headless && <AppHeader />}
            </header>
            <main className={styles.main}>
                {currentView}
            </main>
        </div>
    );
}

export default App;
