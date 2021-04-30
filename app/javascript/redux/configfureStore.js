import { createStore, compose, applyMiddleware } from 'redux';
import {combineReducers} from "redux";
import thunk from 'redux-thunk';
import logger from "redux-logger";
import {userReducer} from "./user/user-reducer";
import {profileReducer} from "./profile/profile-reducer";
import {tweetReducer} from "./tweet/tweet-reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  tweet: tweetReducer
});

const middlewares = [logger, thunk];

let store;

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  store = createStore(
    rootReducer,
    compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
  );
} else {
  store = createStore(
    rootReducer,
    compose(
      applyMiddleware(...middlewares)
    )
  );
}

export default store;
