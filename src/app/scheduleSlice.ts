import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store";

interface ScheduleState {
    value: string
}

const initialState: ScheduleState = {
    value: '{ schedule data}',
}

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    }
})

export const { set } = scheduleSlice.actions;
export const selectSchedule = (state: RootState) => state.schedule.value;

export default scheduleSlice.userReducer;
