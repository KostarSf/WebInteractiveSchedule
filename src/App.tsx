import AppHeader from './components/shared/appheader/AppHeader';
import ScheduleView from './components/schedule/scheduleview/ScheduleView';
import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { FetchUserByToken } from './app/api';
import {useAppDispatch, useAppSelector} from './app/hooks';
import { setUser } from './app/userSlice';
import { setSchedule } from './app/scheduleSlice';
import {GetTestSchedule} from "./app/utils";
import {selectPreferences, setPreferences} from "./app/preferencesSlice";
import {AppViews} from "./app/types";
import TimingsView from "./components/schedule/timingsview/TimingsView";
import ClassView from "./components/schedule/classview/ClassView";

function App() {
    const dispatch = useAppDispatch();
    const preferences = useAppSelector(selectPreferences);

    const [headless, setHeadless] = useState(false);

    useEffect(() => {

        const userToken = 'XVlBzgbaiCMRAjWwhTHctcuAxhxKQFDaFpLSjFbc';
        FetchUserByToken(userToken, (user) => {
            dispatch(setUser(user));

            const scheduleData = GetTestSchedule();
            const userIsEditor = scheduleData.groupEditorIds.indexOf(user.id) > -1;

            dispatch(setPreferences({...preferences, userIsEditor: userIsEditor}));
            dispatch(setSchedule(scheduleData));

            document.title = user.study_group.name + " - Расписание";
        });
    }, [])

    let currentView: JSX.Element;

    switch (preferences.currentView) {
        case AppViews.Schedule: {
            currentView = <ScheduleView />
            break;
        }
        case AppViews.TimingsEdit: {
            currentView = <TimingsView />
            break;
        }
        case AppViews.ClassEdit: {
            currentView = <ClassView />
            break;
        }
        default: {
            currentView = <ScheduleView />
            break;
        }
    }

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
