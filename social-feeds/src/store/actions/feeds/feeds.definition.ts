import { TFeed } from '../../store.definition';

export enum EFeedActionTypes {
    FETCH_FEED_LIST_SUCCESS = 'FETCH_FEED_LIST_SUCCESS',
    FETCH_FEED_LIST_ERROR = 'FETCH_FEED_LIST_ERROR',
    FETCH_FEED_SUCCESS = 'FETCH_FEED_SUCCESS',
    FETCH_FEED_ERROR = 'FETCH_FEED_ERROR',
    ADD_FEED_SUCCESS = 'ADD_FEED_SUCCESS',
    ADD_FEED_ERROR = 'ADD_FEED_ERROR',
    UPDATE_FEED_SUCCESS = 'UPDATE_FEED_SUCCESS',
    UPDATE_FEED_ERROR = 'UPDATE_FEED_ERROR',
    REMOVE_FEED_SUCCESS = 'REMOVE_FEED_SUCCESS',
    REMOVE_FEED_ERROR = 'REMOVE_FEED_ERROR',
};

interface IFetchFeedListSuccess {
    type: EFeedActionTypes.FETCH_FEED_LIST_SUCCESS;
    payload: TFeed[];
};

interface IFetchFeedListError {
    type: EFeedActionTypes.FETCH_FEED_LIST_ERROR;
    payload: Error;
};

interface IFetchFeedSuccess {
    type: EFeedActionTypes.FETCH_FEED_SUCCESS;
    payload: TFeed;
};

interface IFetchFeedError {
    type: EFeedActionTypes.FETCH_FEED_ERROR;
    payload: {id: string, error: Error};
};

interface IAddFeedSuccess {
    type: EFeedActionTypes.ADD_FEED_SUCCESS;
    payload: TFeed;
};

interface IAddFeedError {
    type: EFeedActionTypes.ADD_FEED_ERROR;
    payload: {id: string; error: Error};
};

interface IUpdateFeedSuccess {
    type: EFeedActionTypes.UPDATE_FEED_SUCCESS;
    payload: TFeed;
};

interface IUpdateFeedError {
    type: EFeedActionTypes.UPDATE_FEED_ERROR,
    payload: {id: string; error: Error};
};

interface IRemoveFeedSuccess {
    type: EFeedActionTypes.REMOVE_FEED_SUCCESS,
    payload: string;
};

interface IRemoveFeedError {
    type: EFeedActionTypes.REMOVE_FEED_ERROR,
    payload: {id: string; error: Error};
};

export type TFeedActions =
    IFetchFeedListSuccess |
    IFetchFeedListError |
    
    IFetchFeedSuccess |
    IFetchFeedError |
    
    IAddFeedSuccess |
    IAddFeedError |
    
    IUpdateFeedSuccess |
    IUpdateFeedError |
    
    IRemoveFeedSuccess |
    IRemoveFeedError;
