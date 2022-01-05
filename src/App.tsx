import AppHeader from './components/appheader/AppHeader';
import ScheduleViewer from './components/scheduleviewer/ScheduleViewer';
import styles from './App.module.css';

function App() {
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
