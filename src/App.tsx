import AppHeader from './components/appheader/AppHeader';
import ScheduleViewer from './components/scheduleviewer/ScheduleViewer';
import styles from './App.module.css';
import { useEffect } from 'react';
import { FetchUserByToken } from './app/api';

function App() {
    useEffect(() => {
        const userToken = 'XVlBzgbaiCMRAjWwhTHctcuAxhxKQFDaFpLSjFbc';
        FetchUserByToken(userToken, (user) => {
            //console.log(user);
        });
    })

    const currentView = <ScheduleViewer />;

    return (
        <div className={styles.App}>
            <header>
                <AppHeader />
            </header>
            <main>
                {currentView}
            </main>
        </div>
    );
}

export default App;
