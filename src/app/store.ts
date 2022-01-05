import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import scheduleReducer from "./scheduleSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        schedule: scheduleReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
