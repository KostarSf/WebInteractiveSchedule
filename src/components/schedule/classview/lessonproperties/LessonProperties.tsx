import React, {FunctionComponent, useState} from 'react';
import style from './LessonProperties.module.css';
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack, styled,
    TextField
} from "@mui/material";
import {AccountBox, DesignServices, Place} from "@mui/icons-material";
import {LessonData} from "../../../../app/types";

type LessonPropertiesProps = {
    subgroupId?: number;
    lessonData: LessonData,
}

const LessonProperties: FunctionComponent<LessonPropertiesProps> = ({
    subgroupId ,
    lessonData
}) => {
    const [lessonName, setLessonName] = useState(lessonData.name);
    const [lessonNameBlank, setLessonNameBlank] = useState(false);
    const [lessonType, setLessonType] = useState<string | undefined>(lessonData.type);
    const [teacher, setTeacher] = useState(lessonData.teacher);
    const [place, setPlace] = useState(lessonData.place);

    const subtitle = subgroupId !== undefined ?
        <p className={style.subgroupTitle}>{"Подгруппа " + (subgroupId + 1)}</p> : undefined;

    return (
        <div className={style.lessonProperties}>
            <Stack spacing={"2rem"}>
                {subtitle}
                <StyledTextField
                    label={"Название"}
                    helperText={"* Обязательное поле"}
                    variant={"outlined"}
                    required
                    error={lessonNameBlank}
                    value={lessonName}
                    onChange={e => setLessonName(e.target.value)}
                    onBlur={e => setLessonNameBlank(e.target.value.length === 0)}
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <DesignServices sx={{ fontSize: "2rem", mr: '1rem' }}/>
                    <StyledFormControl variant={"outlined"} size={"small"} fullWidth>
                        <InputLabel>Тип</InputLabel>
                        <Select
                            value={lessonType}
                            onChange={event => setLessonType(event.target.value)}
                            label={"Тип"}
                        >
                            <StyledMenuItem value={""}><i>Отсутствует</i></StyledMenuItem>
                            <StyledMenuItem value={"lecture"}>Лекция</StyledMenuItem>
                            <StyledMenuItem value={"practice"}>Практика</StyledMenuItem>
                            <StyledMenuItem value={"lab"}>Лабораторная</StyledMenuItem>
                            <StyledMenuItem value={"mixed"}>Смешанный</StyledMenuItem>
                        </Select>
                    </StyledFormControl>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountBox sx={{ fontSize: "2rem", mr: '1rem' }}/>
                    <StyledTextField
                        size={"small"}
                        label={"Преподаватель"}
                        variant={"outlined"}
                        fullWidth
                        value={teacher}
                        onChange={e => setTeacher(e.target.value)}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Place sx={{ fontSize: "2rem", mr: '1rem' }}/>
                    <StyledTextField
                        size={"small"}
                        label={"Место проведения"}
                        variant={"outlined"}
                        fullWidth
                        value={place}
                        onChange={e => setPlace(e.target.value)}
                    />
                </Box>
            </Stack>
        </div>
    );
};

const StyledTextField = styled(TextField)(({theme}) => ({
    "& .MuiInputLabel-root, .MuiInputBase-root": {
        fontSize: "1.8rem",
    },
    "& .MuiFormHelperText-root": {
        fontSize: "1.2rem",
    }
}));

const StyledFormControl = styled(FormControl)(({theme}) => ({
    "& .MuiInputLabel-root, .MuiInputBase-root, .MuiMenuItem-root": {
        fontSize: "1.8rem",
    }
}))

const StyledMenuItem = styled(MenuItem)(({theme}) => ({
    "& .MuiMenuItem-root": {
        fontSize: "1.8rem",
    }
}))

export default LessonProperties;