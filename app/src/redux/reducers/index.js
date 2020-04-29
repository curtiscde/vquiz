import { combineReducers } from 'redux';
import user from './userReducer';
import quizzes from './quizzesReducer';
import quiz from './quizReducer';

const rootReducer = combineReducers({
  user,
  quizzes,
  quiz,
});

export default rootReducer;
