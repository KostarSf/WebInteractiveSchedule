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
        setSchedule: (state, action: PayloadAction<ScheduleData>) => {
            state.value = action.payload;
        },
        clearSchedule: (state) => {
            state.value = undefined;
        },
    }
})

export const { setSchedule, clearSchedule } = scheduleSlice.actions;
export const selectSchedule = (state: RootState) => state.schedule.value;

export default scheduleSlice.reducer;
