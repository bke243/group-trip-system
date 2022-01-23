import { useNotifications } from '@mantine/notifications';
import axios, { AxiosResponse } from 'axios';
import { Action } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects'
import { endpoint } from "../utils";

interface PostLoginAction extends Action, ILogin { type: 'POST_LOGIN' }
interface ILogin {
  payload: {
    api_path: string,
    password: string,
    email: string
  }
}
interface PostRegisterAction extends Action, IRegister { type: 'POST_Register' }
interface IRegister {
  payload: IRegisterPayload
}
export interface IRegisterPayload {
  api_path: string,
  password: string,
  firstName: string,
  lastName?: string,
  telephone?: string,
  email: string,
  birthDate?: string,
}
const api = {
  fetch_api: async ({ api_path }: { api_path: string }) => {
    return await axios.get(`${endpoint}${api_path}`)
  },
  post_api: async ({ api_path, body }: { api_path: string, body: Record<string, string> }) => {
    return await axios.post(`${endpoint}${api_path}`, body, { withCredentials: false })
  }

}

function* post_login_request({ payload: { api_path, email, password } }: PostLoginAction): any {
  try {
    const data: AxiosResponse = yield call(api.post_api, { api_path, body: { email, password } });
    yield put({ type: "LOGIN", payload: data.data });
  } catch (e) {
    console.error('error', e);
    yield put({ type: "LOGIN_FAIL" });
  }
}

export function* post_login() {
  yield takeLatest<PostLoginAction>("POST_LOGIN", post_login_request);
}

function* post_register_request({ payload: { api_path, email, password, firstName, lastName = '', birthDate = '10-1-2000', telephone = '' } }: PostRegisterAction): any {
  try {
    const data: AxiosResponse = yield call(api.post_api, { api_path, body: { email, password, firstName, lastName, birthDate, telephone } });
    console.log(data);

    yield put({ type: "REGISTER", payload: data.data });
  } catch (e: any) {
    console.error('error', e);
    const { response }: { response: AxiosResponse } = e
    console.log(response);

    yield put({ type: "REGISTER_FAIL" });
  }
}

export function* post_register() {
  yield takeLatest<PostRegisterAction>("POST_REGISTER", post_register_request);
}