import { combineReducers } from "redux";
import $user from './user.reducer';
import $groups from './groups.reducer';
import $packages from './packages.reducer';
import $messages from './messages.reducer';

const reducers = combineReducers({
    $user,
    $groups,
    $packages,
    $messages
})

export default reducers

export type AppState = ReturnType<typeof reducers>;