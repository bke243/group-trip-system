import { all, fork } from 'redux-saga/effects'
import { post_login, post_register } from './auth_api'
import { delete_groups, get_groups, post_add_group_member, post_groups } from './groups_api'
import { get_messages, post_messages } from './messages_api'
import { get_packages } from './packages_api'

export default function* root() {
    yield all([
        fork(get_groups),
        fork(post_register),
        fork(post_login),
        fork(get_packages),
        fork(get_messages),
        fork(post_messages),
        fork(post_groups),
        fork(delete_groups),
        fork(post_add_group_member)
    ])
}