import React from 'react';
import ClassItem, {ClassItemData} from '../ClassItem';
import style from './style.module.css'

const DaySchedule = () => {
    const dayId = 0;
    const schedule = getTestSchedule();
    const currentDay = false;

    const classesList = schedule.classes.map(cls => {
        return (
            <ClassItem data={cls} key={cls.order} />
        )
    })

    return (
        <div className={style.daySchedule}>
            <div className={style.header}>
                <p className={style.dayName}>{getDayNameById(dayId)}</p>
            </div>
            <div className={style.classesContainer}>
                {classesList}
            </div>
        </div>
    );
};

interface DaySchedule {
    classes: ClassItemData[];
}

function getTestSchedule(): DaySchedule {
    return {
        classes: [
            { order: 0, name: 'Построение', hideEndTime: true },
            {
                order: 1, name: 'Информационные технологии',
                teacher: 'Лейзерович Яков Давыдович', type: 'lab', place: '425'
            },
            {
                order: 2, name: 'Технологии программирования',
                teacher: 'Сливанков Юрий Вячеславович', type: 'lab', place: '401'
            },
            {
                order: 3, name: 'Операционные системы',
                teacher: 'Малахов Сергей Олегович', type: 'lab', place: '433'
            },
        ]
    }
}

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
