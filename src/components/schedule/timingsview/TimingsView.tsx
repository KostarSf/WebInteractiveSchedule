import React, {useState} from 'react';
import {AppViews, ClassTime} from "../../../app/types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectPreferences, setPreferences} from "../../../app/preferencesSlice";
import TimingsList from "./timingslist/TimingsList";
import ViewContainer from "../../shared/viewcontainer/ViewContainer";

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
        <ViewContainer headerProps={{
            title: "Настройка времени",
            backTo: AppViews.Schedule,
            onBack: saveTimingsHandle,
        }}>
            <TimingsList classTimes={scheduleData.classTimes} onChange={TimingsListOnChangeHandle}/>
        </ViewContainer>
    );
};

export default TimingsView;