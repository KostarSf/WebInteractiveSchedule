import React, {FunctionComponent, useState} from 'react';
import {ClassTime, Timing} from "../../../../app/types";
import TimingItem from "./timingitem/TimingItem";
import style from './TimingsList.module.css';

type TimingsListProps = {
    classTimes: ClassTime[],
    onChange: (timings: ClassTime[]) => void,
}

const TimingsList: FunctionComponent<TimingsListProps> = ({
    classTimes,
    onChange,
}) => {
    const [timingsList, setTimingsList] = useState(getCurrentTimings(classTimes, 5));

    const onTimingItemChangeHandle = (updatedItem: Timing) => {
        const updatedTimingList = updateTimingList(timingsList, updatedItem);
        const updatedClassTimesList = generateNewCLassTimesList(updatedTimingList);

        setTimingsList(updatedTimingList);
        onChange.call(null, updatedClassTimesList);

        console.log(updatedClassTimesList);
    }

    const timingItemsList = timingsList.map(item => {
        return <TimingItem key={item.order} data={item}
                           onChange={onTimingItemChangeHandle}/>
    });

    return (
        <div className={style.timingsList}>
            {timingItemsList}
        </div>
    );
};

function generateNewCLassTimesList(timingsList: Timing[]): ClassTime[] {
    return timingsList.filter(item => {
        return item.beginTime !== '' && item.endTime !== '';
    }).map(item => {
        return {
            order: item.order,
            begin: item.beginTime,
            end: item.endTime,
        }
    })
}

function updateTimingList(timingsList: Timing[], updatedItem: Timing): Timing[] {
    return timingsList.map(item => {
        if (item.order !== updatedItem.order) {
            return item;
        }

        return updatedItem;
    })
}

function getCurrentTimings(classTimes: ClassTime[], numberOfClasses: number): Timing[] {
    let newTimings: Timing[] = [];

    for (let i = 0; i <= numberOfClasses; i++) {
        newTimings.push({
            order: i,
            name: i === 0 ? "Построение" : "Пара " + i,
            beginTime: "",
            endTime: "",
        });

        const classTime = classTimes.find(time => time.order === i);

        if (classTime) {
            newTimings[i].beginTime = classTime.begin;
            newTimings[i].endTime = classTime.end;
        }
    }

    return newTimings;
}

export default TimingsList;