import React, {FunctionComponent, useState} from 'react';
import {Timing} from "../../../../../app/types";
import style from './TimingItem.module.css';

type TimingItemProps = {
    data: Timing,
    onChange: (timing: Timing) => void,
}

const TimingItem: FunctionComponent<TimingItemProps> = ({
    data,
    onChange,
}) => {
    const [beginValue, setBeginValue] = useState(getTimeValue(data.beginTime));
    const [endValue, setEndValue] = useState(getTimeValue(data.endTime));

    enum InputName {
        BeginTime = "beginTime",
        EndTime = "endTime",
    }

    const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        let fieldDateStringValue = getNormalizedTime(event.target.valueAsDate)?.toISOString();
        fieldDateStringValue = fieldDateStringValue === undefined ?
                "" : fieldDateStringValue;

        console.log(fieldDateStringValue);

        let newTiming: Timing = {
            order: data.order,
            name: data.name,
            beginTime: data.beginTime,
            endTime: data.endTime,
        }

        if (fieldName === InputName.BeginTime) {
            setBeginValue(fieldValue);
            newTiming.beginTime = fieldDateStringValue;
        } else if (fieldName === InputName.EndTime) {
            setEndValue(fieldValue);
            newTiming.endTime = fieldDateStringValue;
        }

        onChange.call(null, newTiming);
    }

    return (
        <div className={style.timingItem}>
            <p className={style.name}>{data.name}</p>
            <div className={style.timesContainer}>
                <input type={"time"} name={InputName.BeginTime} onChange={onChangeHandle}
                       className={style.timeBeginField} value={beginValue}/>
                <input type={"time"} name={InputName.EndTime} onChange={onChangeHandle}
                       className={style.timeEndField} value={endValue}/>
            </div>
        </div>
    );
};

function getNormalizedTime(date: Date | null): Date | undefined {
    if (date === null) return undefined;

    return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    );
}

function getTimeValue(dateTimeString: string) {
    if (!dateTimeString) return "";

    const date = new Date(dateTimeString);

    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    hours = (hours.length < 2 ? "0" : "") + hours;
    minutes = (minutes.length < 2 ? "0" : "") + minutes;

    return hours + ":" + minutes;
}

export default TimingItem;