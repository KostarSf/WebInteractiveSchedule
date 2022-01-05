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
