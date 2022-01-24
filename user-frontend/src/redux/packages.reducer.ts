import { Dispatch } from "react";

type PackageTypes = {
  packages: {
    data: { name: string }[],
    last_updated: number
  }
}
const initialState = {
  packages: {
    data: [],
    last_updated: 0
  }
} as PackageTypes;

const reducer = (state = initialState, { type, payload }: { type: string, payload: any }): PackageTypes => {
  switch (type) {
    case "PACKAGES":
      return { ...state, packages: { data: [...payload], last_updated: Date.now() } };
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

