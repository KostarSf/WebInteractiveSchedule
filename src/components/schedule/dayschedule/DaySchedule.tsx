import React, {FunctionComponent} from 'react';
import ClassItem from './classitem/ClassItem';
import style from './DaySchedule.module.css'
import {DayScheduleData, ScheduleData} from "../../../app/types";

type DayScheduleProps = {
    scheduleData: ScheduleData | undefined;
    selectedDay: number;
    selectedWeek: number;
}

const DaySchedule: FunctionComponent<DayScheduleProps> = ({
    scheduleData,
    selectedDay,
    selectedWeek
}) => {
    const schedule = getDayScheduleByDayId(scheduleData, selectedDay, selectedWeek);
    const currentDay = false;

    const classesList = schedule?.classes.map(cls => {
        //let current = cls.order === 1;
        return (
            <ClassItem data={cls} key={cls.order} /*current={current}*/ />
        )
    })

    return (
        <div className={style.daySchedule}>
            <div className={style.scrollableContainer}>
                {(classesList && classesList.length > 0) ?
                    <div className={style.classesContainer}>
                        {classesList}
                    </div>
                    : scheduleData &&
                    <div className={style.weekendContainer}>
                        <p className={style.weekendText}>Выходной</p>
                    </div>
                }
            </div>
        </div>
    );
};

function getDayScheduleByDayId(schedule: ScheduleData | undefined,
                               dayId: number,
                               weekId: number): DayScheduleData | undefined {
    if (schedule === undefined) return undefined;

    return schedule.weeks[weekId].days.find((day) => {
        return day.dayId === dayId;
    });
}

export default DaySchedule;
