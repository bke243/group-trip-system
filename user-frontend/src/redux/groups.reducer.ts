import { Dispatch } from "react";

export type Group = {
    name: string,
    created: string,
    ownerId: number,
    destination: string,
    description: string,
    id: string
}
type InitialStateProps = {
    groups: {
        data: Group[],
        last_updated: number
    },
    groupUsers: {
userId:number,
accountId:number,
email:string
    }[]
}
const initialState = {
    groups: {
        data: [],
        last_updated: 0
    },
    groupUsers: []
} as InitialStateProps;

const reducer = (state = initialState, { type, payload }: { type: string, payload: any }): InitialStateProps => {
    switch (type) {
        case "GROUPS":
            return { ...state, groups: { data: [...payload], last_updated: Date.now() } };
        case "CREATE_GROUPS":
            return { ...state, groups: { data: [...state.groups.data, payload], last_updated: Date.now() } };
        case 'D_GROUP': {
            const gid = payload.split('/')[2]
            return { ...state, groups: { data: [...state.groups.data].filter(d => d.id !== (gid)), last_updated: Date.now() } };
        }
        case 'GROUP_USERS': {
            console.log(payload);
            
            return {...state, groupUsers:[...payload.data]}
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
export const $group_users = (groupId: any) => (dispatch: Dispatch<{ type: string, payload: { api_path: string,  groupId:any } }>) => {
    dispatch({
        type: "GET_GROUP_USERS",
        payload: {
            api_path: `/groups/${groupId}/users`,
            groupId
        }
    })
}
export const $add_group_member = (email: string, groupId: string) => (dispatch: Dispatch<{ type: string, payload: { api_path: string, email: string, groupId: string } }>) => {
    dispatch({
        type: "ADD_MEMBER",
        payload: {
            api_path: "/groupUser",
            email,
            groupId
        }
    })
}
export const $delete_group_member = (userId: number, groupId: any) => (dispatch: Dispatch<{ type: string, payload: { api_path: string, groupId: any,userId: number } }>) => {
    dispatch({
        type: "DELETE_MEMBER",
        payload: {
            api_path: `/groupUser/${userId}/${groupId}`,
            groupId, 
            userId
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
export const $update_group = (name: string, destination: string, description: string, groupId: string) => (dispatch: Dispatch<{ type: string, payload: { api_path: string, name: string, destination: string, description: string } }>) => {
    dispatch({
        type: "UPDATE_GROUP",
        payload: {
            api_path: `/groups/${groupId}`,
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