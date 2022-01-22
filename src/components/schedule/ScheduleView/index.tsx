import DaySchedule from '../DaySchedule';
import WeekBar from '../WeekBar';
import styles from './styles.module.css';
import {useState} from "react";
import {useAppSelector} from "../../../app/hooks";
import {selectSchedule} from "../../../app/scheduleSlice";
import DayHeader from "../DayHeader";

function ScheduleView() {
    const scheduleData = useAppSelector(selectSchedule);

    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedWeek, setSelectedWeek] = useState(0);

    const onDaySelectHandle = (id: number) => {
        setSelectedDay(id);
    }

    const onWeekSwapHandle = (id: number) => {
        setSelectedWeek(id);
    }

    return (
        <div className={styles.scheduleView}>
            <DayHeader scheduleData={scheduleData} selectedDay={selectedDay}
                       selectedWeek={selectedWeek} onWeekSwap={onWeekSwapHandle}/>
            <DaySchedule scheduleData={scheduleData} selectedDay={selectedDay}
                         selectedWeek={selectedWeek}/>
            <WeekBar scheduleData={scheduleData} selectedDay={selectedDay}
                     selectedWeek={selectedWeek} onDaySelect={onDaySelectHandle}/>
        </div>
    )
}

export default ScheduleView;
