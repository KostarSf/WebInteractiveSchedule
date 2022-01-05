import DayButton, { DayData } from '../DayButton';
import styles from './styles.module.css'

function WeekBar() {
    const weekDaysData = GenerateDaysDataArray();
    const weekDaysButtons = weekDaysData.map((dayData) => {
        return (
            <DayButton key={dayData.id} data={dayData} />
        )
    })

    return (
        <div className={styles.weekBar}>

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
