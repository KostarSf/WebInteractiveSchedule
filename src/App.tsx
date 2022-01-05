import './App.css';
import AppHeader from './components/appheader/AppHeader';
import ScheduleViewer from './components/scheduleviewer/ScheduleViewer';

function App() {
    const currentView = <ScheduleViewer />;
    
    return (
        <div className="App">
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
