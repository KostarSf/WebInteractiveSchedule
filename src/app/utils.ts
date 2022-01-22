import {ScheduleData} from "./types";

export function GetTestSchedule(): ScheduleData {
    return {
        groupName: 'ИСИТ 2121',
        groupEditorIds: [ 91 ],
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