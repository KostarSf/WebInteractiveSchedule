import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store";
import {ScheduleData} from "./types";

export interface ScheduleState {
    value: ScheduleData | undefined;
}

const initialState: ScheduleState = {
    value: undefined,
}

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<ScheduleData>) => {
            state.value = action.payload;
        },
        clear: (state) => {
            state.value = undefined;
        },
    }
})

export const { set, clear } = scheduleSlice.actions;
export const selectSchedule = (state: RootState) => state.schedule.value;

export default scheduleSlice.reducer;
