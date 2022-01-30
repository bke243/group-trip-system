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
interface GetGroupUsersAction extends Action, IGroupUsers { type: 'GET_GROUP_USERS' }
interface IGroupUsers {
  payload: {
    api_path: string,
    groupId: number
  }
  //other things here
}
interface DeleteGroupAction extends Action, ITask { type: 'DELETE_GROUP' }
interface DeleteMemberAction extends Action, IDeleteMember { type: 'DELETE_MEMBER' }
interface IDeleteMember {
  payload: {
    api_path: string, groupId: any, userId:any
  }
  //other things here
}

interface PostGroupAction extends Action, IPostGroup { type: 'POST_MESSAGES' }
interface IPostGroup {
  payload: {
    api_path: string,
    name: string, destination: string, description: string
  }
  //other things here
}
interface PostAddMemberAction extends Action, IPostAddMember { type: 'ADD_MEMBER' }
interface IPostAddMember {
  payload: {
    api_path: string,
    email: string,
    groupId: string
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
  patch_api: async ({ api_path, body }: { api_path: string, body: Record<string, any> }) => {
    return await axios.patch(`${endpoint}${api_path}`, { ...body }, { headers: { 'Authorization': JSON.parse(window.localStorage.getItem(`user`) || JSON.stringify({ token: '' }))?.token } })
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

function* get_group_users_request({ payload: { api_path, groupId } }: GetGroupUsersAction): any {
  try {
    const data: AxiosResponse = yield call(api.fetch_api, { api_path });
    yield put({ type: "GROUP_USERS", payload: {data:data.data, groupId} });
  } catch (e) {
    console.error('error', e);
    yield put({ type: "GROUP_USERS_FAIL" });
  }
}

export function* get_group_users() {
  yield takeLatest<GetGroupUsersAction>("GET_GROUP_USERS", get_group_users_request);
}

function* post_groups_request({ payload: { api_path, description, destination, name } }: PostGroupAction): any {
  try {
    const data: AxiosResponse = yield call(api.post_api, { api_path, body: { description, destination, name } });
    yield get_groups_request({ type: 'GET_GROUPS', payload: { api_path: '/groups' } })

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

function* post_add_member_action({ payload: { api_path, email, groupId } }: PostAddMemberAction): any {
  try {
    const data: AxiosResponse = yield call(api.post_api, { api_path, body: { email, groupId } });
    yield put({ type: "REDUX_ADD_MEMBER", payload: data.data });
  } catch (e) {
    console.error('error', e);
    yield put({ type: "REDUX_ADD_MEMBER_FAIL" });
  }
}
export function* add_member() {
  yield takeLatest<PostAddMemberAction>("ADD_MEMBER", post_add_member_action);
}

function* delete_member_request({ payload: { api_path, groupId, userId } }: DeleteMemberAction): any {
  try {
    const data: AxiosResponse = yield call(api.delete_api, { api_path });
    yield get_group_users_request({type: `GET_GROUP_USERS`, payload:{api_path:  `/groups/${groupId}/users`, groupId: groupId}})
    yield put({ type: "DELETE_M", payload: api_path });
  } catch (e) {
    console.error('error', e);
    yield put({ type: "DELETE_GROUP_FAIL" });
  }
}

export function* delete_member() {
  yield takeLatest<DeleteMemberAction>("DELETE_MEMBER", delete_member_request);
}

function* update_group_request({ payload: { api_path, description, destination, name } }: PostGroupAction): any {
  try {
    const data: AxiosResponse = yield call(api.patch_api, { api_path, body: { description, destination, name } });
    yield get_groups_request({ type: 'GET_GROUPS', payload: { api_path: '/groups' } })

  } catch (e) {
    console.error('error', e);
    yield put({ type: "CREATE_GROUPS_FAIL" });
  }
}

export function* update_group() {
  yield takeLatest<PostGroupAction>("UPDATE_GROUP", update_group_request);
}