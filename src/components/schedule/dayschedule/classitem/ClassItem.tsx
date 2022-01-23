import React, {FunctionComponent, useState} from 'react';
import styles from './ClassItem.module.css';
import labIcon from './labIcon.svg';
import lectureIcon from './lectureIcon.svg';
import mixedIcon from './mixedIcon.svg';
import practiceIcon from './practiceIcon.svg';
import classNames from "classnames";
import style from "./ClassItem.module.css";
import {ClassItemData, ClassTime, LessonData} from "../../../../app/types";

type ClassItemProps = {
    data: ClassItemData,
    classTimes: ClassTime[],
    current?: boolean
}

const ClassItem: FunctionComponent<ClassItemProps> = ({
    data,
    classTimes,
    current = false
}) => {
    const time = getClassTimeByOrder(classTimes, data.order);
    const [displayBeginTime, displayEndTime] = getDisplayTime(time);

    let lessonItems = data.lessons.map(lesson => {
        return (
            <LessonItem data={lesson}
                        key={data.order + (lesson.subgroupId ? lesson.subgroupId : 0)}/>
        )
    })

    let className = classNames(
        style.classItem,
        {[style.current]: current}
    )

    return (
        <div className={className}>
            <div className={styles.timeColumn}>
                <p className={styles.beginTime}>{displayBeginTime}</p>
                {!data.hideEndTime && <p className={styles.endTime}>{displayEndTime}</p>}
            </div>
            <div className={styles.infoColumn}>
                {lessonItems}
            </div>
        </div>
    );
};

function getClassTimeByOrder(classTimes: ClassTime[], order: number): ClassTime {
    const classTime = classTimes.find(classTime => classTime.order === order);
    if (classTime) {
        return classTime;
    } else {
        throw new Error("There is no classTime with order: " + order);
    }
}

type LessonProps = {
    data: LessonData
}

const LessonItem: FunctionComponent<LessonProps> = ({data}) => {
    const [shortTeacherName, setShortTeacherName] = useState(true);

    const typeImage = createTypeImage(data);
    const showSecondaryInfo = data.teacher !== undefined || data.place !== undefined;

    let subgroupName = getSubgroupNameById(data.subgroupId);
    let teacherName = data.teacher && shortTeacherName ? getShortName(data.teacher) : data.teacher;

    const onTeacherNameClickHandle = () => setShortTeacherName(!shortTeacherName);

    return (
        <div className={styles.lesson}>
            <div className={styles.primaryInfo}>
                <p className={styles.name}>{data.name}</p>
                <p className={styles.groupName}>{subgroupName}</p>
                {typeImage}
            </div>
            {showSecondaryInfo &&
                <div className={styles.secondaryInfo}>
                    {data.teacher && <button className={styles.teacher} onClick={onTeacherNameClickHandle}>{teacherName}</button>}
                    {data.place && <p className={styles.place}>{data.place}</p>}
                </div>
            }
        </div>
    )
}

function getSubgroupNameById(subgroupId: number | undefined): string | undefined {
    if (subgroupId === undefined) return undefined;
    switch (subgroupId) {
        case 0: return 'ПГ1';
        case 1: return 'ПГ2';
        default: return undefined;
    }
}

function getShortName(fio: string) {
    const splitFio = fio.split(' ');
    if (splitFio.length !== 3) {
        console.log(`Wrong name format: '${fio}'. Expected: 'Фамилия Имя Отчество`);
        return fio;
    }
    return `${splitFio[0]} ${splitFio[1][0]}.${splitFio[2][0]}.`;
}

function createTypeImage({type}: LessonData): JSX.Element {
    if (type === undefined) return <></>

    let imagePath:string;

    switch (type) {
        case "lab":
            imagePath = labIcon;
            break;
        case "lecture":
            imagePath = lectureIcon;
            break;
        case "practice":
            imagePath = practiceIcon;
            break;
        case "mixed":
            imagePath = mixedIcon;
            break;
        default:
            throw new Error("Wrong image type: " + type);
    }

    return <img src={imagePath} className={styles.type} alt='class type'/>;
}

function getDisplayTime(classTime: ClassTime):[string, string] {
    const formatTime = (time: Date) => {
        let hours = time.getHours().toString();
        let minutes = time.getMinutes().toString();
        minutes = minutes.length === 1 ? '0' + minutes : minutes;

        return hours + ':' + minutes;
    }

    const beginDate = new Date(classTime.begin);
    const endDate = new Date(classTime.end);

    return [formatTime(beginDate), formatTime(endDate)];
}

export default ClassItem;