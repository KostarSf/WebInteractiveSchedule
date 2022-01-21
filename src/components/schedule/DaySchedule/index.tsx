import React, {FunctionComponent} from 'react';
import ClassItem from '../ClassItem';
import style from './style.module.css'
import {DayScheduleData} from "../../../app/types";

type Props = {
    data?: DayScheduleData;
}

const DaySchedule: FunctionComponent<Props> = ({data}) => {
    const dayId = 0;
    const schedule = data;
    const currentDay = false;

    const classesList = schedule?.classes.map(cls => {
        //let current = cls.order === 1;
        return (
            <ClassItem data={cls} key={cls.order} /*current={current}*/ />
        )
    })

    return (
        <div className={style.daySchedule}>
            <div className={style.header}>
                <p className={style.dayName}>{getDayNameById(dayId)}</p>
            </div>
            {schedule &&
                <div className={style.classesContainer}>
                    {classesList}
                </div>
            }
        </div>
    );
};

function getDayNameById(id: number): string {
    switch (id) {
        case 0:
            return 'Понедельник';
        case 1:
            return 'Вторник';
        case 2:
            return 'Среда';
        case 3:
            return 'Четверг';
        case 4:
            return 'Пятница';
        case 5:
            return 'Суббота';
        case 6:
            return 'Воскресенье';
        default:
            throw new Error("Incorrect day id. Expected: 0..6, recieved: " + id);
    }
}

export default DaySchedule;
