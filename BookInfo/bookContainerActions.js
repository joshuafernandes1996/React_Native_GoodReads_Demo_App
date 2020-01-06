import { createAction } from 'redux-actions';
import { bookActionTypes } from '../Constant';

export const getBookList = createAction(bookActionTypes.GET_BOOK_LIST);
export const getBookInfo = createAction(bookActionTypes.GET_BOOK_INFO);