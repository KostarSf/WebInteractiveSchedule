import React, {FunctionComponent} from 'react';
import style from './BackButton.module.css';
import {AppViews} from "../../../../../app/types";
import {useAppDispatch} from "../../../../../app/hooks";
import {setAppView} from "../../../../../app/preferencesSlice";
import backIcon from './backIcon.svg';

type BackButtonProps = {
    backTo: AppViews,
    onClick?: () => void,
}

const BackButton: FunctionComponent<BackButtonProps> = ({
    backTo,
    onClick
}) => {
    const dispatch = useAppDispatch();

    const onClickHandle = () => {
        onClick?.call(null);
        setTimeout(() => dispatch(setAppView(backTo)), 100);
    }

    return (
        <button className={style.backButton} onClick={onClickHandle}>
            <img src={backIcon} alt={"back"}/>
        </button>
    );
};

export default BackButton;