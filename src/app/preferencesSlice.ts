import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {GetCurrentDay} from "./utils";
import {ScheduleData} from "./types";

export interface Preferences {
    editMode: boolean;
    userIsEditor: boolean;
    editingScheduleData: ScheduleData | undefined;
    hasUnsavedChanges: boolean;
    selectedDay: number;
    selectedWeek: number;
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
    }
}

export const preferencesSlice = createSlice({
    name: 'preferences',
    initialState,
    reducers: {
        setPreferences: (state, action: PayloadAction<Preferences>) => {
            state.value = action.payload;
        }
    }
})

export const { setPreferences } = preferencesSlice.actions;
export const selectPreferences = (state: RootState) => state.preferences.value;

export default preferencesSlice.reducer;