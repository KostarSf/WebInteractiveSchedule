import React, {useState} from 'react';
import style from './TimingsView.module.css';
import ViewHeader from "../../viewheader/ViewHeader";
import {AppViews, ClassTime, Timing} from "../../../app/types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectPreferences, setPreferences} from "../../../app/preferencesSlice";
import ViewContent from "../../viewcontent/ViewContent";
import TimingsList from "./timingslist/TimingsList";

const TimingsView = () => {
    const dispatch = useAppDispatch();

    const preferences = useAppSelector(selectPreferences);
    const scheduleData = preferences.editingScheduleData;
    if (scheduleData === undefined) {
        throw new Error("Error accessing to editing schedule data timings");
    }

    const [classTimes, setClassTimes] = useState<ClassTime[]>(scheduleData.classTimes);

    const TimingsListOnChangeHandle = (newClassTimes: ClassTime[]) => {
        setClassTimes(newClassTimes);
    }

    const saveTimingsHandle = () => {
        dispatch(setPreferences({...preferences, hasUnsavedChanges: true,
            editingScheduleData: { ...scheduleData, classTimes }}));
    }

    return (
        <div className={style.timingsView}>
            <ViewHeader title={"Настройка времени"}
                        backTo={AppViews.Schedule}
                        onBack={saveTimingsHandle}/>
            <ViewContent>
                <TimingsList classTimes={scheduleData.classTimes} onChange={TimingsListOnChangeHandle}/>
            </ViewContent>
        </div>
    );
};

export default TimingsView;