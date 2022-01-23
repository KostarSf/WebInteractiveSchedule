import {ScheduleData} from "./types";

export function GetTestSchedule(): ScheduleData {
    return {
        groupId: 0,
        groupName: 'ИСИТ 2121',
        groupEditorIds: [ 91 ],
        classTimes: [
            {
                order: 0,
                begin: new Date(0, 0, 0, 8, 40).toString(),
                end: new Date(0, 0, 0, 8, 50).toString(),
            },
            {
                order: 1,
                begin: new Date(0, 0, 0, 9, 0).toString(),
                end: new Date(0, 0, 0, 10, 30).toString(),
            },
            {
                order: 2,
                begin: new Date(0, 0, 0, 10, 40).toString(),
                end: new Date(0, 0, 0, 12, 10).toString(),
            },
            {
                order: 3,
                begin: new Date(0, 0, 0, 12, 20).toString(),
                end: new Date(0, 0, 0, 13, 50).toString(),
            },
        ],
        weeks: [
            {
                weekId: 0,
                weekName: 'Нечетная',
                days: [
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

export function GetCurrentDay() {
    const day = new Date().getDay();
    if (day === 0) {
        return 6;
    } else {
        return day - 1;
    }
}