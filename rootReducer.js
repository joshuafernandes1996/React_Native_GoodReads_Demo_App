// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import bookReducer from './BookInfo/bookContainerReducer';
// Redux: Root Reducer
const rootReducer = combineReducers({
  BookList: bookReducer,
});
// Exports
export default rootReducer;