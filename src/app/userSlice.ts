import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserData } from "./types";

export interface UserState {
    status: 'blank' | 'loaded',
    data?: UserData
}

const initialState: UserState = {
    status: 'blank'
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserData>) => {
            state.status = "loaded";
            state.data = action.payload;
        },
        clearUser: (state) => {
            state.status = 'blank';
            state.data = undefined;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.data;

export default userSlice.reducer;
