import axios, { AxiosResponse, AxiosError } from "axios";
import { UserData } from "./types";

export function FetchUserByToken(
    token: string,
    onsuccess: (user: UserData) => void,
    onerror?: (response: AxiosResponse | string) => void
) {
    axios.get<UserData>(
        'https://aumsu-portal.admire.social/api/user',
        { headers: { "Authorization": token } }
    ).then((response) => {
        onsuccess(response.data);
    }, (error: AxiosError) => {
        const response = error.response ? error.response : error.message;
        onerror?.call(null, response);
    })
}
