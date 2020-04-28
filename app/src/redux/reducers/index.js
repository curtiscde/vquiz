import { combineReducers } from 'redux';
import user from './userReducer';
import quiz from './quizReducer';

const rootReducer = combineReducers({
  user,
  quiz,
});

export default rootReducer;
