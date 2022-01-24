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
interface DeleteGroupAction extends Action, ITask { type: 'DELETE_GROUP' }

interface PostGroupAction extends Action, IPostGroup { type: 'POST_MESSAGES' }

interface IPostGroup {
  payload: {
    api_path: string,
    name: string, destination: string, description: string
  }
  //other things here
}
interface PostAddGroupMemberAction extends Action, IPostGroupMember { type: 'POST_ADD_GROUP_MEMBER' }
interface IPostGroupMember {
  payload: {
    api_path: string,
    groupId: any, email: string
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
  delete_api: async ({ api_path }: { api_path: string }) => {
    return await axios.delete(`${endpoint}${api_path}`, { headers: { 'Authorization': JSON.parse(window.localStorage.getItem(`user`) || JSON.stringify({ token: '' }))?.token } })
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

function* post_groups_request({ payload: { api_path, description, destination, name } }: PostGroupAction): any {
  try {
    const data: AxiosResponse = yield call(api.post_api, { api_path, body: { description, destination, name } });
    yield put({ type: "CREATE_GROUPS", payload: data.data });
  } catch (e) {
    console.error('error', e);
    yield put({ type: "CREATE_GROUPS_FAIL" });
  }
}

export function* post_groups() {
  yield takeLatest<PostGroupAction>("POST_GROUPS", post_groups_request);
}

function* delete_groups_request({ payload: { api_path } }: DeleteGroupAction): any {
  try {
    const data: AxiosResponse = yield call(api.delete_api, { api_path });
    yield get_groups_request({ type: 'GET_GROUPS', payload: { api_path: '/groups' } })
    yield put({ type: "D_GROUP", payload: api_path });
  } catch (e) {
    console.error('error', e);
    yield put({ type: "DELETE_GROUP_FAIL" });
  }
}

export function* delete_groups() {
  yield takeLatest<DeleteGroupAction>("DELETE_GROUP", delete_groups_request);
}

function* post_add_group_member_request({ payload: { api_path, email, groupId } }: PostAddGroupMemberAction): any {
  try {
    const data: AxiosResponse = yield call(api.post_api, { api_path, body: { email, groupId } });
    yield put({ type: "ADD_MEMBER", payload: data.data });
  } catch (e) {
    console.error('error', e);
    yield put({ type: "ADD_MEMBER_FAIL" });
  }
}

export function* post_add_group_member() {
  yield takeLatest<PostAddGroupMemberAction>("POST_ADD_GROUP_MEMBER", post_add_group_member_request);
}