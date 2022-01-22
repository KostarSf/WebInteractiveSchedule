import DaySchedule from '../dayschedule/DaySchedule';
import WeekBar from '../weekbar/WeekBar';
import style from './ScheduleView.module.css';
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectSchedule} from "../../../app/scheduleSlice";
import DayHeader from "../dayheader/DayHeader";
import {selectPreferences, set} from "../../../app/preferencesSlice";

function ScheduleView() {
    const scheduleData = useAppSelector(selectSchedule);
    const preferences = useAppSelector(selectPreferences);
    const dispatch = useAppDispatch();

    const [selectedDay, setSelectedDay] = useState(preferences.selectedDay);
    const [selectedWeek, setSelectedWeek] = useState(preferences.selectedWeek);

    const onDaySelectHandle = (id: number) => {
        setSelectedDay(id);
        dispatch(set({...preferences, selectedDay: id}));
    }

    const onWeekSwapHandle = (id: number) => {
        setSelectedWeek(id);
        dispatch(set({...preferences, selectedWeek: id}));
    }

    return (
        <div className={style.scheduleView}>
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
