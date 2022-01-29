import React, {cloneElement, FunctionComponent} from 'react';
import ClassItem, {NewClassItem} from './classitem/ClassItem';
import style from './DaySchedule.module.css'
import {DayScheduleData, ScheduleData} from "../../../../app/types";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {
    selectPreferences,
    setPreferences,
    setPreferencesUpdateEditingDayScheduleData, switchMorningFormationState
} from "../../../../app/preferencesSlice";
import {getDayNameById} from "../../../../app/utils";
import {selectUser} from "../../../../app/userSlice";

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

    const preferences = useAppSelector(selectPreferences);
    const dispatch = useAppDispatch();

    const onClassClickHandle = (order: number) => {
        if (preferences.editMode === false) return;

        if (order === 0) {
            dispatch(switchMorningFormationState({selectedWeek, selectedDay}));
        }
    }

    let classesList: JSX.Element[] = [];
    if (scheduleData !== undefined) {
        const lastorder = Math.max.apply(Math, scheduleData.classTimes.map(sd => sd.order));
        for (let i = 0; i <= lastorder; i++) {
            const classTime = scheduleData.classTimes.find(e => e.order === i);
            if (classTime === undefined) continue;

            const classItemData = schedule?.classes.find(ci => ci.order === i);

            if (classItemData) {
                if (i === 0 && preferences.editMode) {
                    classesList.push(<NewClassItem order={i} key={i} onClick={onClassClickHandle}
                                                   classTime={classTime} checked={true}/>);
                } else {
                    classesList.push(<ClassItem data={classItemData} clickable={preferences.editMode}
                                                key={i} classTime={classTime} onClick={onClassClickHandle}/>);
                }
            } else if (preferences.editMode) {
                classesList.push(<NewClassItem order={i} key={i} onClick={onClassClickHandle}
                                               classTime={classTime}/>);
            }
        }
    }


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
                               weekId: number): DayScheduleData {
    const blankSchedule: DayScheduleData = {
        dayId: dayId,
        dayName: getDayNameById(dayId),
        classes: []
    };

    if (schedule === undefined) return blankSchedule;

    const daySchedule = schedule.weeks[weekId].days.find((day) => {
        return day.dayId === dayId;
    });

    if (daySchedule === undefined) {
        return blankSchedule;
    } else {
        return daySchedule;
    }
}

export default DaySchedule;