import React, {FunctionComponent, PropsWithChildren} from 'react';
import style from './ViewContent.module.css';

type ViewContentProps = {
    children: JSX.Element,
}

const ViewContent: FunctionComponent<PropsWithChildren<ViewContentProps>> = ({
    children
}) => {
    return (
        <div className={style.viewContent}>
            <div className={style.scrollContainer}>
                {children}
            </div>
        </div>
    );
};

export default ViewContent;