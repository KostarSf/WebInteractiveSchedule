import React, {FunctionComponent} from 'react';
import style from './DayHeader.module.css';
import {ScheduleData} from "../../../../app/types";
import weekSwitcherIcon from "./weekSwitcherIcon.svg";
import EditModeButton from "./editmodebutton/EditModeButton";
import EditTimingsButton from "./edittimingsbutton/EditTimingsButton";
import {getDayNameById} from "../../../../app/utils";

type DayHeaderProps = {
    scheduleData: ScheduleData | undefined;
    selectedDay: number;
    selectedWeek: number;
    onWeekSwap: (id: number) => void;
}

const DayHeader: FunctionComponent<DayHeaderProps> = ({
    scheduleData,
    selectedDay,
    selectedWeek,
    onWeekSwap
}) => {
    const weekName = scheduleData?.weeks.find(week => week.weekId === selectedWeek)?.weekName;

    const weekSwitcherClickHandle = () => {
        const nextWeekId = getNextWeekId(scheduleData, selectedWeek);
        onWeekSwap(nextWeekId);
    }

    return (
        <div className={style.dayHeader}>
            <EditTimingsButton />
            <div className={style.dayHeaderContent}>
                <p className={style.dayName}>{getDayNameById(selectedDay)}</p>
                {weekName &&
                    <button className={style.weekSwitcher} onClick={weekSwitcherClickHandle}>
                        <p className={style.weekSwitcherText}>{weekName} неделя</p>
                        <img className={style.weekSwitcherIcon} src={weekSwitcherIcon} alt={'swap week icon'} />
                    </button>
                }
            </div>
            <EditModeButton />
        </div>
    );
};

function getNextWeekId(scheduleData: ScheduleData | undefined,
                       selectedWeek: number): number {
    if (scheduleData === undefined
        || scheduleData.weeks.length === 0) {
        return selectedWeek;
    }

    if (scheduleData.weeks.length === 1) {
        return scheduleData.weeks[0].weekId;
    }

    const lastId = Math.max.apply(Math, scheduleData.weeks.map(o => o.weekId));
    if (selectedWeek >= lastId) {
        return 0;
    } else {
        return selectedWeek + 1;
    }
}

export default DayHeader;