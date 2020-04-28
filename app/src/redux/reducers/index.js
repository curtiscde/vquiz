import { combineReducers } from 'redux';
import user from './userReducer';
import quizzes from './quizReducer';

const rootReducer = combineReducers({
  user,
  quizzes,
});

export default rootReducer;
