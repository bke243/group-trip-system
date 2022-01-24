import axios, { AxiosResponse } from 'axios';
import { Action } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects'
import { endpoint } from '../utils';
;


interface GetPackagesAction extends Action, ITask { type: 'GET_PACKAGES' }
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

function* get_packages_request({ payload: { api_path } }: GetPackagesAction): any {
  try {
    const data: AxiosResponse = yield call(api.fetch_api, { api_path });
    yield put({ type: "PACKAGES", payload: data.data });
  } catch (e) {
    console.error('error', e);
    yield put({ type: "PACKAGES_FAIL" });
  }
}

export function* get_packages() {
  yield takeLatest<GetPackagesAction>("GET_PACKAGES", get_packages_request);
}