import { combineReducers } from 'redux';
import ui from './uiReducer';
import user from './userReducer';
import quizzes from './quizzesReducer';
import quiz from './quizReducer';

const rootReducer = combineReducers({
  ui,
  user,
  quizzes,
  quiz,
});

export default rootReducer;
