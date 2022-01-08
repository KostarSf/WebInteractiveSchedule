import classNames from "classnames";
import React, { FunctionComponent } from "react"
import style from './styles.module.css';

export interface DayData {
    id: number,
    name: string,
}

type Props = {
    data: DayData;
    holiday?: boolean;
    selected?: boolean;
    currentDay?: boolean;
    onClick?: (id: number) => void;
}

const DayButton: FunctionComponent<Props> = ({
    data,
    holiday,
    selected,
    currentDay,
    onClick
}) => {
    const onClickHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.call(null, data.id);
    }

    let className = classNames(
        style.dayButton,
        {[style.selected]: selected},
        {[style.holiday]: holiday},
        {[style.current]: currentDay}
    );
    
    return (
        <button className={className} onClick={onClickHandle}>
            {data.name}
        </button>
    )
}

export default DayButton;
