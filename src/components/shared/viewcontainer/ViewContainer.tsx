import React, {FunctionComponent, PropsWithChildren} from 'react';
import style from './ViewContainer.module.css';
import ViewHeader, {ViewHeaderProps} from "../viewheader/ViewHeader";
import ViewContent from "../viewcontent/ViewContent";

type ViewContainerProps = {
    headerProps: ViewHeaderProps,
    children: JSX.Element[] | JSX.Element,
}

const ViewContainer: FunctionComponent<PropsWithChildren<ViewContainerProps>> = ({
    headerProps,
    children
}) => {
    return (
        <div className={style.viewContainer}>
            <ViewHeader title={headerProps.title}
                        backTo={headerProps.backTo}
                        onBack={headerProps.onBack}/>
            <ViewContent>
                {children}
            </ViewContent>
        </div>
    );
};

export default ViewContainer;