import { useState } from 'react';
import DayButton, { DayData } from '../DayButton';
import styles from './styles.module.css'

function WeekBar() {
    const [selectedDay, setSelectedDay] = useState(0);
    const currentDayId = -1;
    const workingDays = [0, 1, 3, 4];

    const onDayButtonClickHandle = (id: number) => {
        setSelectedDay(id);
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
        <div className={styles.weekBar}>
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
