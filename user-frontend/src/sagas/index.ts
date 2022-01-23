import { all, fork } from 'redux-saga/effects'
import { post_login, post_register } from './auth_api'
import { get_groups } from './groups_api'

export default function* root() {
    yield all([
        fork(get_groups),
        fork(post_register),
        fork(post_login)
    ])
}