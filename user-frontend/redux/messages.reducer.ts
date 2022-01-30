import { Dispatch } from "react";

const initialState = {
  messages: {
    data: [],
    last_updated: 0
  }
};

const reducer = (state = initialState, { type, payload }: { type: string, payload: any }) => {
  switch (type) {
    case "MESSAGES":
      return { ...state, messages: { data: [...payload], last_updated: Date.now() } };
    default:
      return state;
  }
};

export default reducer;

export const $fetch_messages = (userID: number | null) => (dispatch: Dispatch<{ type: string, payload: { api_path: string } }>) => {
  dispatch({
    type: "GET_MESSAGES",
    payload: {
      api_path: `/messages/${userID}`
    }
  })
}

export const $send_message = (content: string) => (dispatch: Dispatch<{ type: string, payload: { api_path: string, content: string } }>) => {
  dispatch({
    type: "POST_MESSAGES",
    payload: {
      api_path: `/messages/user`,
      content: content
    }
  })
}

