import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import scheduleReducer from "./scheduleSlice";
import preferencesReducer from "./preferencesSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        schedule: scheduleReducer,
        preferences: preferencesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
