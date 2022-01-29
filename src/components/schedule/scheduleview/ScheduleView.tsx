import DaySchedule from './dayschedule/DaySchedule';
import WeekBar from './weekbar/WeekBar';
import style from './ScheduleView.module.css';
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectSchedule} from "../../../app/scheduleSlice";
import {selectPreferences, setPreferences} from "../../../app/preferencesSlice";
import DayHeader from "./dayheader/DayHeader";

function ScheduleView() {
    const preferences = useAppSelector(selectPreferences);
    const currentScheduleData = useAppSelector(selectSchedule);
    const scheduleData = preferences.editMode ?
            preferences.editingScheduleData : currentScheduleData;
    const dispatch = useAppDispatch();

    const [selectedDay, setSelectedDay] = useState(preferences.selectedDay);
    const [selectedWeek, setSelectedWeek] = useState(preferences.selectedWeek);

    const onDaySelectHandle = (id: number) => {
        setSelectedDay(id);
        dispatch(setPreferences({...preferences, selectedDay: id}));
    }

    const onWeekSwapHandle = (id: number) => {
        setSelectedWeek(id);
        dispatch(setPreferences({...preferences, selectedWeek: id}));
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
