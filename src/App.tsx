import AppHeader from './components/appheader/AppHeader';
import ScheduleView from './components/schedule/scheduleview/ScheduleView';
import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { FetchUserByToken } from './app/api';
import {useAppDispatch, useAppSelector} from './app/hooks';
import { setUser } from './app/userSlice';
import { setSchedule } from './app/scheduleSlice';
import {GetTestSchedule} from "./app/utils";

function App() {
    const dispatch = useAppDispatch();
    const preferences = useAppSelector(selectPreferences);

    const [headless, setHeadless] = useState(false);

    useEffect(() => {
        const userToken = 'XVlBzgbaiCMRAjWwhTHctcuAxhxKQFDaFpLSjFbc';
        FetchUserByToken(userToken, (user) => {
            dispatch(setUser(user));
            dispatch(setSchedule(GetTestSchedule()));
            document.title = user.study_group.name + " - Расписание";
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
