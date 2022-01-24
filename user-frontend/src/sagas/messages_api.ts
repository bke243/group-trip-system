import axios, { AxiosResponse } from 'axios';
import { Action } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects'
import { endpoint } from '../utils';
;


interface GetMessagesAction extends Action, ITask { type: 'GET_MESSAGES' }
interface ITask {
  payload: {
    api_path: string
  }
  //other things here
}
interface PostMessagesAction extends Action, IPostMessages { type: 'POST_MESSAGES' }
interface IPostMessages {
  payload: {
    api_path: string,
    content: string
  }
  //other things here
}
const api = {
  fetch_api: async ({ api_path }: { api_path: string }) => {
    return await axios.get(`${endpoint}${api_path}`, { headers: { 'Authorization': JSON.parse(window.localStorage.getItem(`user`) || JSON.stringify({ token: '' }))?.token } })
  },
  post_api: async ({ api_path, body }: { api_path: string, body: Record<string, any> }) => {
    return await axios.post(`${endpoint}${api_path}`, { ...body }, { headers: { 'Authorization': JSON.parse(window.localStorage.getItem(`user`) || JSON.stringify({ token: '' }))?.token } })
  },

}

function* get_messages_request({ payload: { api_path } }: GetMessagesAction): any {
  try {
    const data: AxiosResponse = yield call(api.fetch_api, { api_path });
    yield put({ type: "MESSAGES", payload: data.data });
  } catch (e) {
    console.error('error', e);
    yield put({ type: "MESSAGES_FAIL" });
  }
}

export function* get_messages() {
  yield takeLatest<GetMessagesAction>("GET_MESSAGES", get_messages_request);
}
function* post_messages_request({ payload: { api_path, content } }: PostMessagesAction): any {
  try {
    const data: AxiosResponse = yield call(api.post_api, { api_path, body: { content } });
    yield put({ type: "MESSAGES", payload: data.data });
  } catch (e) {
    console.error('error', e);
    yield put({ type: "MESSAGES_FAIL" });
  }
}

export function* post_messages() {
  yield takeLatest<PostMessagesAction>("POST_MESSAGES", post_messages_request);
}