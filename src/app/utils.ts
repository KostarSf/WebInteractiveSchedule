import {DayScheduleData, LessonData, ScheduleData} from "./types";

export function GetTestSchedule(): ScheduleData {
    return {
        groupId: 0,
        groupName: 'ИСИТ 2121',
        groupEditorIds: [ 91 ],
        classTimes: [
            {
                order: 0,
                begin: new Date(0, 0, 0, 8, 40).toISOString(),
                end: new Date(0, 0, 0, 8, 50).toISOString(),
            },
            {
                order: 1,
                begin: new Date(0, 0, 0, 9, 0).toISOString(),
                end: new Date(0, 0, 0, 10, 30).toISOString(),
            },
            {
                order: 2,
                begin: new Date(0, 0, 0, 10, 40).toISOString(),
                end: new Date(0, 0, 0, 12, 10).toISOString(),
            },
            {
                order: 3,
                begin: new Date(0, 0, 0, 12, 20).toISOString(),
                end: new Date(0, 0, 0, 13, 50).toISOString(),
            },
        ],
        weeks: [
            {
                weekId: 0,
                weekName: 'Нечетная',
                days: [
                    {
                        dayId: 1,
                        dayName: 'Вторник',
                        classes: [
                            { order: 0, hideEndTime: true, lessons: [{ name: 'Построение' }] },
                            {
                                order: 1, lessons: [
                                    {
                                        name: 'Информационные технологии', subgroupId: 0,
                                        teacher: 'Лейзерович Яков Давыдович', type: 'lab', place: '425'
                                    },
                                    {
                                        name: 'Технологии программирования', subgroupId: 1,
                                        teacher: 'Сливанков Юрий Вячеславович', type: 'lab', place: '401'
                                    }
                                ]
                            },
                            {
                                order: 2, lessons: [{
                                    name: 'Технологии программирования',
                                    teacher: 'Сливанков Юрий Вячеславович', type: 'lab', place: '401'
                                }]
                            },
                            {
                                order: 3, lessons: [{
                                    name: 'Операционные системы',
                                    teacher: 'Малахов Сергей Олегович', type: 'lab', place: '433'
                                }]
                            },
                        ]
                    },
                    {
                        dayId: 2,
                        dayName: 'Среда',
                        classes: [
                            { order: 0, hideEndTime: true, lessons: [{name: 'Построение' }] },
                            {
                                order: 1, lessons: [
                                    { name: 'Информационные технологии', subgroupId: 0,
                                        teacher: 'Лейзерович Яков Давыдович', type: 'lab', place: '425' },
                                    { name: 'Технологии программирования', subgroupId: 1,
                                        teacher: 'Сливанков Юрий Вячеславович', type: 'lab', place: '401' }
                                ]
                            },
                            {
                                order: 2, lessons: [{ name: 'Технологии программирования',
                                    teacher: 'Сливанков Юрий Вячеславович', type: 'lab', place: '401' }]
                            },
                            {
                                order: 3, lessons: [{ name: 'Операционные системы',
                                    teacher: 'Малахов Сергей Олегович', type: 'lab', place: '433' }]
                            },
                        ]
                    }
                ]
            },
            {
                weekId: 1,
                weekName: 'Четная',
                days: [
                    {
                        dayId: 1,
                        dayName: 'Вторник',
                        classes: [
                            {
                                order: 2, lessons: [{ name: 'Схемотехника',
                                    teacher: 'Духнич Евгений Иванович', type: 'lab', place: 'Дистанционно' }]
                            },
                        ]
                    }
                ]
            }
        ]
    }
}


export function getDayScheduleByDayId(schedule: ScheduleData | undefined,
                                      dayId: number,
                                      weekId: number): DayScheduleData {
    const blankSchedule: DayScheduleData = {
        dayId: dayId,
        dayName: getDayNameById(dayId),
        classes: []
    };

    if (schedule === undefined) return blankSchedule;

    const weekSchedule = schedule.weeks.find(week => week.weekId === weekId);
    if (weekSchedule === undefined) return blankSchedule;

    const daySchedule = weekSchedule.days.find((day) => {
        return day.dayId === dayId;
    });

    if (daySchedule === undefined) {
        return blankSchedule;
    } else {
        return daySchedule;
    }
}

export function getLessonsData(schedule: ScheduleData | undefined,
                             weekId: number,
                             dayId: number,
                             classOrder: number): LessonData[] {

    const dayData = getDayScheduleByDayId(schedule, dayId, weekId);
    if (dayData === undefined) return [];

    const classItem = dayData.classes.find(classItem => classItem.order === classOrder);
    if (classItem === undefined) return [];

    return classItem.lessons;
}

export function getDayNameById(id: number): string {
    switch (id) {
        case 0:
            return 'Понедельник';
        case 1:
            return 'Вторник';
        case 2:
            return 'Среда';
        case 3:
            return 'Четверг';
        case 4:
            return 'Пятница';
        case 5:
            return 'Суббота';
        case 6:
            return 'Воскресенье';
        default:
            throw new Error("Incorrect day id. Expected: 0..6, received: " + id);
    }
}

export function GetCurrentDay() {
    const day = new Date().getDay();
    if (day === 0) {
        return 6;
    } else {
        return day - 1;
    }
}
