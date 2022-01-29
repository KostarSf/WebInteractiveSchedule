import React from 'react';
import ViewContainer from "../../shared/viewcontainer/ViewContainer";
import {useAppSelector} from "../../../app/hooks";
import {selectPreferences} from "../../../app/preferencesSlice";
import {AppViews} from "../../../app/types";

const ClassView = () => {
    const preferences = useAppSelector(selectPreferences);

    const classSaveHandle = () => {

    }

    return (
        <ViewContainer headerProps={{
            title: "Пара " + preferences.selectedClass,
            backTo: AppViews.Schedule,
            onBack: classSaveHandle,
        }}>

        </ViewContainer>
    );
};

export default ClassView;