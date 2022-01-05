import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserData } from "./types";

interface UserState {
    status: 'blank' | 'loaded',
    data?: UserData
}

const initialState: UserState = {
    status: 'blank',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<UserData>) => {
            state = {
                status: 'loaded',
                data: action.payload,
            }
        },
        clear: (state) => {
            state = {
                status: 'blank',
            }
        },
    },
})

export const { set, clear } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.data;

export default userSlice.userReducer;
