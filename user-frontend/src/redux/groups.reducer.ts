import { Dispatch } from "react";

const initialState = {
    groups: {
        data: [],
        last_updated: 0
    }
};

const reducer = (state = initialState, { type, payload }: { type: string, payload: any }) => {
    switch (type) {
        case "GROUPS":
            return { ...state, groups: { data: [...payload], last_updated: Date.now() } };
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

