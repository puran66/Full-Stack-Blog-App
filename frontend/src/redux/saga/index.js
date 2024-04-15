import {all} from 'redux-saga/effects';
import {  handle_deleteBlog_saga, handle_getBlogs_saga, handle_user_blogs_saga } from './root/rootSaga';

export function* rootSaga(){
  yield all([handle_getBlogs_saga(),handle_user_blogs_saga(),handle_deleteBlog_saga()]);
}