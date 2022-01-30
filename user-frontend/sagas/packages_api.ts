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
interface BuyPackageAction extends Action, IBuyPackage { type: 'BUY_PACKAGE' }
interface IBuyPackage {
  payload: {
    api_path: string,
    group_id: number,
    package_id: number,
    card_number: string,
    expiry_month: number,
    expiry_year: number,
    cvc: string
  }
  //other things here
}
interface FeedbackAction extends Action, IFeedback { type: 'BUY_PACKAGE' }
interface IFeedback {
  payload: {
    api_path: string,
    group_id: any, package_id: any, feedback: string
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

function* buy_package_request({ payload: { api_path, card_number, cvc, expiry_month, expiry_year, group_id, package_id } }: BuyPackageAction): any {
  try {
    const data: AxiosResponse = yield call(api.post_api, { api_path, body: { group_id, package_id, payment_details: { card_number, cvc, expiry_month, expiry_year, } } });
    yield put({ type: "PACKAGES_BOUGHT", payload: { package_id, group_id } });
  } catch (e) {
    console.error('error', e);
    yield put({ type: "CREATE_GROUPS_FAIL" });
  }
}

export function* buy_package() {
  yield takeLatest<BuyPackageAction>("BUY_PACKAGE", buy_package_request);

}
function* feedback_request({ payload: { api_path, group_id, package_id, feedback } }: FeedbackAction): any {
  try {
    const data: AxiosResponse = yield call(api.post_api, { api_path, body: { group_id, package_id, feedback } });
    yield put({ type: "FEEDBACK_RETURN", payload: { package_id, group_id } });
  } catch (e) {
    console.error('error', e);
    yield put({ type: "CREATE_GROUPS_FAIL" });
  }
}

export function* feedback() {
  yield takeLatest<FeedbackAction>("FEEDBACK", feedback_request);
} 