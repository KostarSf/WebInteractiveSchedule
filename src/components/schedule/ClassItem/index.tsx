import React, {FunctionComponent, useState} from 'react';
import styles from './styles.module.css';
import labIcon from './labIcon.svg';
import lectureIcon from './lectureIcon.svg';
import mixedIcon from './mixedIcon.svg';
import practiceIcon from './practiceIcon.svg';

export interface ClassItemData {
    order: number,
    name: string,
    teacher?: string,
    type?: 'lecture' | 'practice' | 'lab' | 'mixed',
    place?: string,
    hideEndTime?: boolean,
}

type Props = {
    data: ClassItemData
}

const ClassItem: FunctionComponent<Props> = ({data}) => {
    const [shortTeacherName, setShortTeacherName] = useState(true);

    const time = getClassTimeByOrder(data.order);
    const [displayBeginTime, displayEndTime] = getDisplayTime(time);
    const typeImage = createTypeImage(data);
    const showSecondaryInfo = data.teacher !== undefined || data.place !== undefined;

    let teacherName = data.teacher && shortTeacherName ? getShortName(data.teacher) : data.teacher;

    const onTeacherNameClickHandle = () => setShortTeacherName(!shortTeacherName);

    return (
        <div className={styles.classItem}>
            <div className={styles.timeColumn}>
                <p className={styles.beginTime}>{displayBeginTime}</p>
                {!data.hideEndTime && <p className={styles.endTime}>{displayEndTime}</p>}
            </div>
            <div className={styles.infoColumn}>
                <div className={styles.primaryInfo}>
                    <p className={styles.name}>{data.name}</p>
                    <p className={styles.groupName}></p>
                    {typeImage}
                </div>
                {showSecondaryInfo &&
                    <div className={styles.secondaryInfo}>
                        {data.teacher && <p className={styles.teacher} onClick={onTeacherNameClickHandle}>{teacherName}</p>}
                        {data.place && <p className={styles.place}>{data.place}</p>}
                    </div>
                }
            </div>
        </div>
    );
};

function getShortName(fio: string) {
    const splitFio = fio.split(' ');
    if (splitFio.length !== 3) {
        console.log(`Wrong name format: '${fio}'. Expected: 'Фамилия Имя Отчество`);
        return fio;
    }
    return `${splitFio[0]} ${splitFio[1][0]}.${splitFio[2][0]}.`;
}

interface ClassTime {
    begin: Date;
    end: Date;
}

function getClassTimeByOrder(order: number): ClassTime {
    switch (order) {
        case 0:
            return {
                begin: new Date(0, 0, 0, 8, 40),
                end: new Date(0, 0, 0, 8, 50),
            }
        case 1:
            return {
                begin: new Date(0, 0, 0, 9, 0),
                end: new Date(0, 0, 0, 10, 30),
            }
        case 2:
            return {
                begin: new Date(0, 0, 0, 10, 40),
                end: new Date(0, 0, 0, 12, 10),
            }
        case 3:
            return {
                begin: new Date(0, 0, 0, 12, 20),
                end: new Date(0, 0, 0, 13, 50),
            }
        default: return { begin: new Date(0), end: new Date(0) }
    }
}

function createTypeImage({type}: ClassItemData): JSX.Element {
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

    return [formatTime(classTime.begin), formatTime(classTime.end)];
}

export default ClassItem;