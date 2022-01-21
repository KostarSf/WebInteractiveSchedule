import DaySchedule from '../DaySchedule';
import WeekBar from '../WeekBar';
import styles from './styles.module.css';
import {useState} from "react";

function ScheduleView() {
    const [selectedDay, setSelectedDay] = useState(0);

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
