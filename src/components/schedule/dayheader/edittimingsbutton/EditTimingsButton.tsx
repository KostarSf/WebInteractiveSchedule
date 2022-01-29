import React, {FunctionComponent} from "react";
import style from './EditTimingsButton.module.css';
import editTimingsIcon from './editTimingsIcon.svg';
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {selectPreferences, setAppView} from "../../../../app/preferencesSlice";
import {AppViews} from "../../../../app/types";

type EditTimingsButtonProps = {

}

const EditTimingsButton: FunctionComponent<EditTimingsButtonProps> = () => {
    const preferences = useAppSelector(selectPreferences);
    const dispatch = useAppDispatch();

    if (preferences.userIsEditor === false) return <></>;
    if (preferences.editMode === false) return <></>;

    const onClickHandle = () => {
        setTimeout(() => dispatch(setAppView(AppViews.TimingsEdit)), 100);
    }

    return (
        <button className={style.editTimingsButton} onClick={onClickHandle}>
            <img src={editTimingsIcon} alt="edit mode button"/>
        </button>
    )
}

export default EditTimingsButton;