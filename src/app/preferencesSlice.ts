import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {GetCurrentDay, getDayNameById} from "./utils";
import {AppViews, DayScheduleData, ScheduleData} from "./types";

export interface Preferences {
    editMode: boolean;
    userIsEditor: boolean;
    editingScheduleData: ScheduleData | undefined;
    hasUnsavedChanges: boolean;
    selectedDay: number;
    selectedWeek: number;
    selectedClass: number | undefined;
    currentView: AppViews;
}

export interface PreferencesState {
    value: Preferences,
}

const initialState: PreferencesState = {
    value: {
        editMode: false,
        userIsEditor: false,
        editingScheduleData: undefined,
        hasUnsavedChanges: false,
        selectedDay: GetCurrentDay(),
        selectedWeek: 0,
        selectedClass: undefined,
        currentView: AppViews.Schedule
    }
}

export interface SelectedDate {
    selectedWeek: number,
    selectedDay: number,
}

export interface UpdateDayScheduleData extends SelectedDate {
    daySchedule: DayScheduleData,
}

export const preferencesSlice = createSlice({
    name: 'preferences',
    initialState,
    reducers: {
        setPreferences: (state, action: PayloadAction<Preferences>) => {
            state.value = action.payload;
        },
        switchMorningFormationState: (state, action:PayloadAction<SelectedDate>) => {
            let schedule = state.value.editingScheduleData;

            if (schedule === undefined) {
                throw new Error("Can not modify schedule that didn't exist.");
            }

            let daySchedule = schedule.weeks[action.payload.selectedWeek].days.find((day) => {
                return day.dayId === action.payload.selectedDay;
            });

            if (daySchedule === undefined) {
                daySchedule = {
                    dayId: action.payload.selectedDay,
                    dayName: getDayNameById(action.payload.selectedDay),
                    classes: []
                };
            }

            const formationItem = daySchedule.classes.find(
                    classItem => classItem.order === 0);

            if (formationItem !== undefined) {
                const index = daySchedule.classes.indexOf(formationItem);
                daySchedule.classes.splice(index, 1);
            } else {
                const formationTime = schedule.classTimes.find(ct => ct.order === 0);
                if (formationTime) {
                    daySchedule.classes.unshift({
                        order: 0,
                        hideEndTime: true,
                        lessons: [{ name: "Построение" }]
                    })
                }
            }

            state.value.editingScheduleData = updateEditingDayScheduleData(
                    action.payload.selectedWeek, action.payload.selectedDay,
                    schedule, daySchedule);
        },
        setPreferencesUpdateEditingDayScheduleData: (state, action: PayloadAction<UpdateDayScheduleData>) => {

        },
        setAppView: (state, action: PayloadAction<AppViews>) => {
            state.value.currentView = action.payload;
        }
    }
})

function updateEditingDayScheduleData(selectedWeek: number, selectedDay: number,
                                      schedule: ScheduleData, daySchedule: DayScheduleData): ScheduleData {
    let newScheduleData = schedule;
    let newDaySchedule = daySchedule;

    if (newScheduleData === undefined) {
        throw new Error("Can not modify schedule that didn't exist.");
    }

    if (selectedDay !== newDaySchedule.dayId) {
        throw new Error(`Selected day value (${selectedDay}) and dayId ` +
            `of dayScheduleData (${newDaySchedule.dayId}) didn't match.`);
    }

    const week = newScheduleData.weeks.find(week => week.weekId === selectedWeek);
    if (week === undefined) {
        newScheduleData.weeks.push({
            weekId: selectedWeek,
            weekName: "Новая неделя " + (selectedWeek + 1),
            days: [newDaySchedule]
        })
    } else {
        const weekIndex = newScheduleData.weeks.indexOf(week);
        const day = week.days.find(day => day.dayId === selectedDay);

        if (day === undefined) {
            newScheduleData.weeks[weekIndex].days.push(newDaySchedule);
        } else {
            const dayIndex = newScheduleData.weeks[weekIndex].days.indexOf(day);
            newScheduleData.weeks[weekIndex].days[dayIndex] = newDaySchedule;
        }
    }

    return newScheduleData;
}

export const { setPreferences, switchMorningFormationState, setAppView,
    setPreferencesUpdateEditingDayScheduleData } = preferencesSlice.actions;
export const selectPreferences = (state: RootState) => state.preferences.value;

export default preferencesSlice.reducer;