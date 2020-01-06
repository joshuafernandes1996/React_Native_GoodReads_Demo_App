import { delay, takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import { bookActionTypes } from '../Constant';
import axios from "axios";
import { xml2js } from 'xml-js';

const xmlConverterOptions = {
  compact: true,
  ignoreComment: true,
  spaces: 4
}

const EndPoint = 'https://www.goodreads.com/search/index.xml';

function* getBookList(args) {
  try {
    let res = yield call(axios.get, `https://www.goodreads.com/search/index.xml?key=QCf9fqFFKR4jkWnlpqFuw&q=${args.payload.q}&page=${args.payload.page}`);
    const xmlAsJs = xml2js(res.data, xmlConverterOptions);
    console.log(xmlAsJs);
    let arrayOfBooks = [];
    let data = xmlAsJs.GoodreadsResponse;

    if (data && Array.isArray(data.search.results.work)) {
      data.search.results.work.map(x => {
        arrayOfBooks.push({
          id: x.id._text,
          bookCount: x.books_count._text,
          totalRatings: x.ratings_count._text,
          year: x.original_publication_year._text,
          month: x.original_publication_month._text,
          day: x.original_publication_day._text,
          avgRating: x.average_rating._text,
          bookInfo: {
            title: x.best_book.title._text,
            author: x.best_book.author.name._text,
            img: x.best_book.image_url._text,
            bookId: x.best_book.id._text
          }
        })
      });
    }

    yield put({
      type: bookActionTypes.GET_BOOK_LIST_SUCCESS,
      payload: { data: arrayOfBooks, totalFound: data.search['total-results']._text }
    });
  }
  catch (error) {
    console.log(error);
    yield put({
      type: bookActionTypes.GET_BOOK_LIST_FAILURE,
      value: 1,
    });
  }
};

function* getBookInfo(args) {
  try {
    let res = yield call(axios.get,
      `https://www.goodreads.com/book/show?key=QCf9fqFFKR4jkWnlpqFuw&id=${args.payload.bookId}`
    );
    const xmlAsJs = xml2js(res.data, xmlConverterOptions);
    console.log(xmlAsJs)
    let data = xmlAsJs.GoodreadsResponse;
    let similarBooks = [];

    data.book.similar_books.book.map(x => {
      similarBooks.push({ img: x.image_url._cdata})
    })

    let bookData = {
      title: data.book.title._cdata,
      author: data.book.authors.author[0].name._text,
      avgRating: data.book.average_rating._text,
      description: data.book.description._cdata,
      format: data.book.format._cdata,
      image: data.book.image_url._text,
      numberOfPages: data.book.num_pages._cdata,
      pub_day: data.book.publication_day._text,
      pub_year: data.book.publication_year._text,
      pub_month: data.book.publication_month._text,
      publisher: data.book.publisher._text,
      ratings_count: data.book.ratings_count._cdata,
      similarBooks:similarBooks
    }

    yield put({
      type: bookActionTypes.GET_BOOK_INFO_SUCCESS,
      payload: bookData,
    });
  }
  catch (error) {
    console.log(error);
    yield put({
      type: bookActionTypes.GET_BOOK_INFO_FAILURE,
      value: 1,
    });
  }
}

// Watcher: Increase Counter Async
export function* getBookListSaga() {
  // Take Last Action Only
  yield takeLatest(bookActionTypes.GET_BOOK_LIST, getBookList);
  yield takeLatest(bookActionTypes.GET_BOOK_INFO, getBookInfo);
};
