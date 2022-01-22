import {FunctionComponent} from 'react';
import DayButton, { DayData } from '../daybutton/DayButton';
import style from './WeekBar.module.css'
import {ScheduleData} from "../../../app/types";

type WeekBarProps = {
    scheduleData: ScheduleData | undefined;
    selectedDay: number;
    selectedWeek: number;
    onDaySelect: (id: number) => void;
}

function getWorkingDays(scheduleData: ScheduleData | undefined,
                        selectedWeek: number): number[] {
    if (scheduleData === undefined) return [];

    let workingDays: number[] = [];
    scheduleData.weeks.find(week => week.weekId === selectedWeek)
                ?.days.forEach((day) => {
        workingDays.push(day.dayId);
    })

    return workingDays;
}

const WeekBar: FunctionComponent<WeekBarProps> = ({
    scheduleData,
    selectedDay,
    selectedWeek,
    onDaySelect,
}) => {
    const currentDayId = -1;
    const workingDays = getWorkingDays(scheduleData, selectedWeek);

    const onDayButtonClickHandle = (id: number) => {
        onDaySelect(id);
    }

    const weekDaysData = GenerateDaysDataArray();
    const weekDaysButtons = weekDaysData.map(data =>
        <DayButton
            key={data.id}
            data={data}
            holiday={workingDays.indexOf(data.id) < 0}
            selected={data.id === selectedDay}
            currentDay={data.id === currentDayId}
            onClick={onDayButtonClickHandle}
        />
    );

    return (
        <div className={style.weekBar}>
            {weekDaysButtons}
        </div>
    )
}

function GenerateDaysDataArray(): DayData[] {
    return [
        { id: 0, name: 'ПН' },
        { id: 1, name: 'ВТ' },
        { id: 2, name: 'СР' },
        { id: 3, name: 'ЧТ' },
        { id: 4, name: 'ПТ' },
        { id: 5, name: 'СБ' },
        { id: 6, name: 'ВС' },
    ]
}

export default WeekBar;
