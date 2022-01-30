import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk';
import createRootReducer from './reducers'
import sagas from '../sagas';

export default function configureStore() {

    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        createRootReducer,
        compose(
            applyMiddleware(
                thunk,
                sagaMiddleware
            ,)
        ),
    )

    sagaMiddleware.run(sagas);

    (global as any).store = store;
    return store
}