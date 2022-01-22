import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";

export interface Preferences {
    editMode: boolean;
    selectedDay: number;
    selectedWeek: number;
}

export interface PreferencesState {
    value: Preferences,
}

const initialState: PreferencesState = {
    value: {
        editMode: false,
        selectedDay: 0,
        selectedWeek: 0,
    }
}

export const preferencesSlice = createSlice({
    name: 'preferences',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<Preferences>) => {
            state.value = action.payload;
        }
    }
})

export const { set } = preferencesSlice.actions;
export const selectPreferences = (state: RootState) => state.preferences.value;

export default preferencesSlice.reducer;