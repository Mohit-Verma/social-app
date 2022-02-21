import {combineReducers} from 'redux';
import { ESliceName } from '../store.definition';
import { activeUserReducer } from './active-user';
import {commentReducer} from './comments';
import { feedReducer } from './feeds';
import { userReducer } from './user';

export default combineReducers({
    [ESliceName.CommentSlice]: commentReducer,
    [ESliceName.FeedSlice]: feedReducer,
    [ESliceName.ActiveUserSlice]: activeUserReducer,
    [ESliceName.UserSlice]: userReducer
});
