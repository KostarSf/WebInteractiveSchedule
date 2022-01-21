export type UserData = {
    id: number;
    status: string;
    login: string;
    password: string;
    first_name: string;
    patronymic: string;
    last_name: string;
    avatar: string;
    study_group: StudyGroupData;
    study_group_id: number;
    token: string;
    created_at: string;
    updated_at: string;
}

export type StudyGroupData = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface ScheduleData {
    weeks: WeekScheduleData[];
}

export interface WeekScheduleData {
    weekId: number;
    weekName: string;
    days: DayScheduleData[];
}

export interface DayScheduleData {
    dayId: number;
    dayName: string;
    classes: ClassItemData[];
}

export interface ClassItemData {
    order: number,
    hideEndTime?: boolean,
    lessons: LessonData[],
}

export interface LessonData {
    name: string,
    teacher?: string,
    type?: 'lecture' | 'practice' | 'lab' | 'mixed',
    place?: string,
    subgroupId?: number,
}
