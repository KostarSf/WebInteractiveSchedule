import DaySchedule from '../DaySchedule';
import WeekBar from '../WeekBar';
import styles from './styles.module.css';
import {useState} from "react";

function ScheduleView() {
    const [selectedDay, setSelectedDay] = useState(0);

    const onDaySelectHandle = (id: number) => {
        setSelectedDay(id);
    }

    return (
        <div className={styles.scheduleView}>
            <div className={styles.dayContainer}>
                <DaySchedule selectedDay={selectedDay}/>
            </div>
            <div className={styles.weekbarContainer}>
                <WeekBar selectedDay={selectedDay} onDaySelect={onDaySelectHandle}/>
            </div>
        </div>
    )
}

export default ScheduleView;
