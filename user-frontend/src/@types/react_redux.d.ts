import 'react-redux';

import { AppState } from '../redux/reducers';

declare module 'react-redux' {
    interface DefaultRootState extends AppState { }
}