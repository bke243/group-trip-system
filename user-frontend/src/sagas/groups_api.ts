import axios, { AxiosResponse } from 'axios';
import { Action } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects'
import { endpoint } from '../utils';
;


interface GetGroupsAction extends Action, ITask { type: 'GET_GROUPS' }
interface ITask {
  payload: {
    api_path: string
  }
  //other things here
}
const api = {
  fetch_api: async ({ api_path }: { api_path: string }) => {
    return await axios.get(`${endpoint}${api_path}`, { headers: { 'Authorization': JSON.parse(window.localStorage.getItem(`user`) || JSON.stringify({ token: '' }))?.token } })
  },

}

function* get_groups_request({ payload: { api_path } }: GetGroupsAction): any {
  try {
    const data: AxiosResponse = yield call(api.fetch_api, { api_path });
    yield put({ type: "GROUPS", payload: data.data });
  } catch (e) {
    console.error('error', e);
    yield put({ type: "GROUPS_FAIL" });
  }
}

export function* get_groups() {
  yield takeLatest<GetGroupsAction>("GET_GROUPS", get_groups_request);
}