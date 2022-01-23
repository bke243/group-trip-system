import { Dispatch } from "react";
import { IRegisterPayload } from "../sagas/auth_api";

type InitialStateType = {
    personData: {
        email: string,
        id: number | null
    },
    token: string | null,
    loading: boolean,
    loggedIn: boolean
}

const initialState = {
    personData: {
        email: '',
        id: null
    },
    token: null,
    loggedIn: false,
    loading: true
} as InitialStateType;

const reducer = (state = initialState, { type, payload }: { type: string, payload: any }): InitialStateType => {
    switch (type) {
        case 'REGISTER': {
            window.localStorage.setItem("user", JSON.stringify(payload))
            return { ...state, personData: { email: payload.personData.email, id: payload.personData.id }, token: payload.token, loading: false, loggedIn: true }
        }
        case 'LOGIN': {
            window.localStorage.setItem("user", JSON.stringify(payload))
            return { ...state, personData: { email: payload.personData.email, id: payload.personData.id }, token: payload.token, loading: false, loggedIn: true }
        }
        case 'RETRIEVE_USER': {
            if (payload) return { ...state, personData: { email: payload.personData.email, id: payload.personData.id }, token: payload.token, loading: false, loggedIn: true }
            else return { ...state, loading: false, loggedIn: false }
        }
        default:
            return state;
    }
};
export default reducer

export const $register = ({
    email,
    password,
    firstName,
    lastName = '',
    telephone = '',
    birthDate = '',
}: {
    email: string,
    password: string,
    firstName: string,
    lastName?: string,
    telephone?: string,
    birthDate?: string,
}) => (dispatch: Dispatch<{ type: string, payload: IRegisterPayload }>) => {
    dispatch({
        type: "POST_REGISTER",
        payload: {
            api_path: "/auth/signup",
            password,
            firstName,
            lastName,
            telephone,
            email,
            birthDate,
        }
    })
}
export const $login = ({
    email,
    password
}: {
    email: string,
    password: string,
}) => (dispatch: Dispatch<{ type: string, payload: { api_path: string, email: string, password: string } }>) => {
    dispatch({
        type: "POST_LOGIN",
        payload: {
            api_path: "/auth/login",
            password,
            email,
        }
    })
}

export const retrieveUser = () => {
    const user = window.localStorage.getItem("user") ? JSON.parse(window.localStorage.getItem("user") || '') : null;
    return { type: "RETRIEVE_USER", payload: user !== "" ? user : null }
}