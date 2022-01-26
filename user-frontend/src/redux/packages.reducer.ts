import { Dispatch } from "react";
export type Package = {
    activities: string[],
    adminId: number,
    count: number,
    created: string,
    description: string,
    endDate: string,
    id: number,
    locationId: number,
    maxPersons: number,
    name: string,
    price: number,
    startDate: string,
}
type PackagesState = {
    packages: {
        last_updated: number,
        data: Package[],
    },
}
const initialState = {
    packages: {
        data: [],
        last_updated: 0
    },

} as PackagesState;

const reducer = (state = initialState, { type, payload }: { type: string, payload: any }): PackagesState => {
    switch (type) {
        case "PACKAGES":
            return { ...state, packages: { data: [...payload], last_updated: Date.now() } };

        case "PACKAGES_BOUGHT":
            window.localStorage.setItem("bought", JSON.stringify([...(JSON.parse(window.localStorage.getItem("bought") || "[]") || []), { ...state.packages.data.find(d => d.id === payload.package_id), group_id: payload.group_id }]))
            return { ...state }
        default:
            return state;
    }
};

export default reducer;

export const $fetch_packages = () => (dispatch: Dispatch<{ type: string, payload: { api_path: string } }>) => {
    dispatch({
        type: "GET_PACKAGES",
        payload: {
            api_path: "/packages"
        }
    })
}

export const $buy_package = (
    group_id: number,
    package_id: number,
    card_number: string,
    expiry_month: number,
    expiry_year: number,
    cvc: string
) => (dispatch: Dispatch<{
    type: string, payload: {
        api_path: string,
        group_id: number,
        package_id: number,
        card_number: string,
        expiry_month: number,
        expiry_year: number,
        cvc: string
    }
}>) => {
        dispatch({
            type: "BUY_PACKAGE",
            payload: {
                api_path: "/purchase",
                group_id,
                package_id,
                card_number,
                expiry_month,
                expiry_year,
                cvc,
            }
        })
    }


export const $feedback = (group_id: any, package_id: any, feedback: string) => (dispatch: Dispatch<{ type: string, payload: { api_path: string, group_id: any, package_id: any, feedback: string } }>) => {
    dispatch({
        type: "FEEDBACK",
        payload: {
            api_path: "/feedback",
            group_id,
            package_id,
            feedback,
        }
    })
}