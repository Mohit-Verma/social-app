import {Dispatch} from 'redux';
import { TFeedActions } from '.';
import {ServiceRequest, urls} from '../../../bifrost';
import { feedListSelector, feedMapSelector } from '../../selectors/feeds';
import { TFeed, TStoreState } from '../../store.definition';
import { EFeedActionTypes } from './feeds.definition';

export const getFeedList = (state: TStoreState): TFeed[] => {
    return feedListSelector(state);
};

export const getFeedMap = (state: TStoreState): Record<string, {data?: TFeed; error?: Error}> => {
    return feedMapSelector(state);
};

export const loadAllFeeds = () => {
    return async (dispatch: Dispatch<TFeedActions>) => {
        const {status, data: feedList} = await ServiceRequest.get(urls.feeds);
        if (status === 200) {
            dispatch({
                type: EFeedActionTypes.FETCH_FEED_LIST_SUCCESS,
                payload: feedList
            });
        }
    };
};

export const loadFeed = (feedId: string) => {
    return async (dispatch: Dispatch<TFeedActions>) => {
        const {status, data: feed} = await ServiceRequest.get(`${urls.feeds}/${feedId}`);
        if (status === 200) {
            dispatch({
                type: EFeedActionTypes.FETCH_FEED_SUCCESS,
                payload: feed
            });
        }
    };
};

export const addFeed = (feed: TFeed) => {
    return async (dispatch: Dispatch<TFeedActions>) => {
        const {status, data: newFeed} = await ServiceRequest.post(urls.feeds, feed);
        if (status === 201) {
            dispatch({
                type: EFeedActionTypes.ADD_FEED_SUCCESS,
                payload: newFeed
            });
        }
    };
};

export const updateFeed = (feed: TFeed) => {
    return async (dispatch: Dispatch<TFeedActions>) => {
        const {status, data: updatedFeed} = await ServiceRequest.put(`${urls.feeds}/${feed.id}`, feed);
        if (status === 200) {
            dispatch({
                type: EFeedActionTypes.UPDATE_FEED_SUCCESS,
                payload: updatedFeed
            });
        }
    };
};

export const removeFeed = (feed: TFeed) => {
    return async (dispatch: Dispatch<TFeedActions>) => {
        const {status} = await ServiceRequest.delete(`${urls.feeds}/${feed.id}`);
        if (status === 200) {
            dispatch({
                type: EFeedActionTypes.REMOVE_FEED_SUCCESS,
                payload: feed.id
            });
        }
    };
};
