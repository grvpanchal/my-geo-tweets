import { combineReducers } from 'redux';
import tweetsReducers from './tweetsReducer';
import userReducer from './userReducer';
import headerReducer from './headerReducer';
import searchFormReducer from './searchFormReducer';

const rootReducer = combineReducers({
  header: headerReducer,
  user: userReducer,
  tweets: tweetsReducers,
  searchForm: searchFormReducer,
});

export default rootReducer;
