import { Dispatch } from "react";

export type Group = {
    name: string,
    created: string,
    ownerId: number,
    destination: string,
    description: string,
    id: number
}
type InitialStateProps = {
    groups: {
        data: Group[],
        last_updated: number
    }
}
const initialState = {
    groups: {
        data: [],
        last_updated: 0
    }
} as InitialStateProps;

const reducer = (state = initialState, { type, payload }: { type: string, payload: any }): InitialStateProps => {
    switch (type) {
        case "GROUPS":
            return { ...state, groups: { data: [...payload], last_updated: Date.now() } };
        case "CREATE_GROUPS":
            return { ...state, groups: { data: [...state.groups.data, payload], last_updated: Date.now() } };
        case 'D_GROUP': {
            const gid = payload.split('/')[2]
            return { ...state, groups: { data: [...state.groups.data].filter(d => d.id !== parseInt(gid)), last_updated: Date.now() } };
        }
        default:
            return state;
    }
};

export default reducer;

export const $fetch_groups = () => (dispatch: Dispatch<{ type: string, payload: { api_path: string } }>) => {
    dispatch({
        type: "GET_GROUPS",
        payload: {
            api_path: "/groups"
        }
    })
}

export const $create_group = (name: string, destination: string, description: string) => (dispatch: Dispatch<{ type: string, payload: { api_path: string, name: string, destination: string, description: string } }>) => {
    dispatch({
        type: "POST_GROUPS",
        payload: {
            api_path: "/groups",
            name,
            destination,
            description
        }
    })
}

export const $delete_group = (groupID: any) => (dispatch: Dispatch<{ type: string, payload: { api_path: string } }>) => {
    dispatch({
        type: "DELETE_GROUP",
        payload: {
            api_path: `/groups/${groupID}`
        }
    })
}
export const $add_group_member = (groupId: any, email: string) => (dispatch: Dispatch<{ type: string, payload: { api_path: string, groupId: any, email: string } }>) => {
    dispatch({
        type: "POST_ADD_GROUP_MEMBER",
        payload: {
            api_path: `/groupUser`, email, groupId
        }
    })
}