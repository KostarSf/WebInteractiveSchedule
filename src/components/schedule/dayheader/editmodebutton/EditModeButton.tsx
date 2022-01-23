import React, {FunctionComponent} from "react";
import style from './EditModeButton.module.css';
import editModeIcon from './editModeIcon.svg';
import closeIcon from './closeIcon.svg';
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {selectPreferences, setPreferences} from "../../../../app/preferencesSlice";
import {selectSchedule} from "../../../../app/scheduleSlice";

type EditModeButtonProps = {

}

const EditModeButton: FunctionComponent<EditModeButtonProps> = () => {
    const dispatch = useAppDispatch();

    const preferences = useAppSelector(selectPreferences);
    const currentScheduleData = useAppSelector(selectSchedule);
    if (preferences.userIsEditor === false) return <></>;

    const iconRef = preferences.editMode ? closeIcon : editModeIcon;

    const EditModeButtonHandle = () => {
        const enableEditMode = !preferences.editMode;

        const editingScheduleDataValue = enableEditMode ? currentScheduleData : undefined;

        dispatch(setPreferences({...preferences,
                editingScheduleData: editingScheduleDataValue,
                editMode: enableEditMode}));
    }

    return (
        <button className={style.editModeButton} onClick={EditModeButtonHandle}>
            <img src={iconRef} alt="edit mode button"/>
        </button>
    )
}

export default EditModeButton;