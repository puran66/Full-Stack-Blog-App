import { combineReducers } from 'redux'
import { blogReducer } from './blogs/reducer/reducer'


const rootReducer = combineReducers({
  blogReducer
})


export default rootReducer;