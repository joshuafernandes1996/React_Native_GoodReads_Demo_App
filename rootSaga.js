// Imports: Dependencies
import { all, fork} from 'redux-saga/effects';
// Imports: Redux Sagas
import { getBookListSaga } from './BookInfo/bookContainerSaga';
// Redux Saga: Root Saga
export function* rootSaga () {
  yield all([
    fork(getBookListSaga),
  ]);
};