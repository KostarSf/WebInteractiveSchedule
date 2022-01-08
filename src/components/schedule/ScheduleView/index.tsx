import DaySchedule from '../DaySchedule';
import WeekBar from '../WeekBar';
import styles from './styles.module.css';

function ScheduleView() {
    return (
        <div className={styles.scheduleView}>
            <div className={styles.dayContainer}>
                <DaySchedule />
            </div>
            <div className={styles.weekbarContainer}>
                <WeekBar />
            </div>
        </div>
    )
}

export default ScheduleView;
