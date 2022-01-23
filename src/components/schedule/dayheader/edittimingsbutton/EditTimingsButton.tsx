import React, {FunctionComponent} from "react";
import style from './EditTimingsButton.module.css';
import editTimingsIcon from './editTimingsIcon.svg';
import {useAppSelector} from "../../../../app/hooks";
import {selectPreferences} from "../../../../app/preferencesSlice";

type EditTimingsButtonProps = {

}

const EditTimingsButton: FunctionComponent<EditTimingsButtonProps> = () => {
    const preferences = useAppSelector(selectPreferences);
    if (preferences.userIsEditor === false) return <></>;
    if (preferences.editMode === false) return <></>;

    return (
        <button className={style.editTimingsButton}>
            <img src={editTimingsIcon} alt="edit mode button"/>
        </button>
    )
}

export default EditTimingsButton;