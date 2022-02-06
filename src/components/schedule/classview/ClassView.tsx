import React, {useState} from 'react';
import style from './ClassView.module.css';
import ViewContainer from "../../shared/viewcontainer/ViewContainer";
import {useAppSelector} from "../../../app/hooks";
import {selectPreferences} from "../../../app/preferencesSlice";
import {AppViews, ClassItemData, DayScheduleData, LessonData} from "../../../app/types";
import {getDayNameById, getDayScheduleByDayId, getLessonsData} from "../../../app/utils";
import LessonProperties from "./lessonproperties/LessonProperties";
import {Stack, styled, ToggleButton, ToggleButtonGroup} from "@mui/material";

const ClassView = () => {
    const preferences = useAppSelector(selectPreferences);

    const [noDivision, setNoDivision] = useState<true | null>(true);
    const [subgroups, setSubgroups] = useState<number[]>(() => []);

    const [lessons, setLessons] = useState<LessonData[]>(
            getLessonsData(preferences.editingScheduleData, preferences.selectedWeek,
                preferences.selectedDay, preferences.selectedClass));

    const noDivisionButtonHandle = (
        event: React.MouseEvent<HTMLElement>,
        newState: true | null
    ) => {
        if (newState === true) {
            setNoDivision(newState);
            setSubgroups([]);
        }
    }

    const subgroupsButtonHandle = (
        event: React.MouseEvent<HTMLElement>,
        newState: number[]
    ) => {
        if (newState.length > 0) {
            setSubgroups(newState);
            setNoDivision(null);
        }
    };

    const classSaveHandle = () => {

    }

    const headerTitle = `${getDayNameById(preferences.selectedDay)} — пара ${preferences.selectedClass}`;

    const lessonPropertiesList = noDivision ?
        <LessonProperties lessonData={lessons[0]}/> :
        subgroups.sort().map(subid => <LessonProperties subgroupId={subid} key={subid}
                                                        lessonData={lessons[subid]} />)

    return (
        <ViewContainer headerProps={{
            title: headerTitle,
            backTo: AppViews.Schedule,
            onBack: classSaveHandle,
        }}>
            <Stack spacing={"4rem"}>
                <Stack spacing={"2rem"}>
                    <p className={style.subtitle}>Разделение на подгруппы</p>
                    <Stack direction={"row"} spacing={"1rem"}>
                        <StyledToggleButtonGroup
                            exclusive
                            value={noDivision}
                            onChange={noDivisionButtonHandle}
                        >
                            <ToggleButton value={true}>Отсутствует</ToggleButton>
                        </StyledToggleButtonGroup>
                        <StyledToggleButtonGroup
                            fullWidth
                            value={subgroups}
                            onChange={subgroupsButtonHandle}
                        >
                            <ToggleButton value={0}>ПГ1</ToggleButton>
                            <ToggleButton value={1}>ПГ2</ToggleButton>
                        </StyledToggleButtonGroup>
                    </Stack>
                </Stack>
                {lessonPropertiesList}
            </Stack>
        </ViewContainer>
    );
};

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({
    "& .MuiToggleButton-root": {
        fontSize: "1.4rem",
        lineHeight: "1.4rem",
        padding: "1.5rem 2rem",
        borderRadius: "0.2rem",
        "&.Mui-selected": {
            backgroundColor: "#99B9F5 !important" ,
            borderColor: "#99B9F5",
            color: "white",
            "&:not(:first-of-type)": {
                borderLeftColor: "#b4cbf5",
            },
            "&:not(:last-of-type)": {
                borderRightColor: "#b4cbf5",
            },
        },
    }
}))

export default ClassView;