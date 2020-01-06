import { handleActions } from "redux-actions";
import { bookActionTypes } from '../Constant';

export default (handleActions(
  {
    [bookActionTypes.GET_BOOK_LIST]: (state, action) => {
      return {
        ...state,
        list: action.payload.isLoadingMore ? state.list : [],
        isLoading: action.payload.isLoadingMore ? false : true,
        isLoadingMore: action.payload.isLoadingMore
      }
    },
    [bookActionTypes.GET_BOOK_LIST_SUCCESS]: (state, action) => {

      let currentItems = state.list;
      let newItems = action.payload.data;

      console.log('current', currentItems);
      console.log('new', newItems)

      let combinedItems = [...currentItems, ...newItems]

      console.log('combined', combinedItems)

      return {
        ...state,
        list: combinedItems,
        totalFound: action.payload.totalFound,
        isLoading: false,
        isLoadingMore: false
      }
    },
    [bookActionTypes.GET_BOOK_LIST_FAILURE]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isLoadingMore: false
      }
    },
    [bookActionTypes.GET_BOOK_INFO]: (state, action) => {
      return {
        ...state,
        isLoadingInfo: true,
      }
    },
    [bookActionTypes.GET_BOOK_INFO_SUCCESS]: (state, action) => {
      return {
        ...state,
        isLoadingInfo: false,
        bookInfo: action.payload
      }
    },
    [bookActionTypes.GET_BOOK_INFO_FAILURE]: (state, action) => {
      return {
        ...state,
        isLoadingInfo: false,
      }
    },
  },
  {
    list: [],
    isLoading: false,
    totalFound: 0,
    isLoadingMore: false,
    isLoadingInfo: false,
    bookInfo: {}
  }
));

