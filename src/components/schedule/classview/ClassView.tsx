import React from 'react';
import ViewContainer from "../../shared/viewcontainer/ViewContainer";
import {useAppSelector} from "../../../app/hooks";
import {selectPreferences} from "../../../app/preferencesSlice";
import {AppViews} from "../../../app/types";
import {getDayNameById} from "../../../app/utils";

const ClassView = () => {
    const preferences = useAppSelector(selectPreferences);

    const classSaveHandle = () => {

    }

    const headerTitle = `${getDayNameById(preferences.selectedDay)} — пара ${preferences.selectedClass}`;

    return (
        <ViewContainer headerProps={{
            title: headerTitle,
            backTo: AppViews.Schedule,
            onBack: classSaveHandle,
        }}>

        </ViewContainer>
    );
};

export default ClassView;