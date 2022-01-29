import React, {FunctionComponent} from 'react';
import style from './ViewHeader.module.css';
import {AppViews} from "../../../app/types";
import BackButton from "./backbutton/BackButton";

type ViewHeaderProps = {
    title: string,
    backTo: AppViews,
    onBack?: () => void,
}

const ViewHeader: FunctionComponent<ViewHeaderProps> = ({
    title,
    backTo,
    onBack
}) => {
    const onBackHandle = () => {
        onBack?.call(null);
    }

    return (
        <div className={style.viewHeader}>
            <div className={style.viewHeaderWrapper}>
                <BackButton backTo={backTo} onClick={onBackHandle}/>
                <div className={style.viewHeaderContent}>
                    <p className={style.title}>{title}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewHeader;