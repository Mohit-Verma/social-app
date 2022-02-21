import { TFeedActions } from '../../actions/feeds';
import { EFeedActionTypes } from '../../actions/feeds/feeds.definition';
import { TFeed, TFeedSlice } from '../../store.definition';

const initState: TFeedSlice = {
    feedMap: {},
    feeds: []
};

export const feedReducer = (state = initState, actions: TFeedActions): TFeedSlice => {
    switch (actions.type) {
        case EFeedActionTypes.FETCH_FEED_LIST_SUCCESS:{
            const feeds = actions.payload;
            const feedMap: Record<string, {data?: TFeed, error?: Error}> = {...state.feedMap};
            
            feeds.forEach((feed) => {
                feedMap[feed.id] = {data: feed}
            });
            
            return {
                ...state,
                feeds,
                feedMap
            };
        }
        case EFeedActionTypes.FETCH_FEED_LIST_ERROR:
            return {
                ...state,
                error: actions.payload
            };
        case EFeedActionTypes.FETCH_FEED_ERROR:
            return {
                ...state,
                feedMap: {
                    ...state.feedMap,
                    [actions.payload.id]: {error: actions.payload.error}
                }
            };
        case EFeedActionTypes.ADD_FEED_SUCCESS: {
            const feeds = [...state.feeds, actions.payload];
            const feedMap = {...state.feedMap, [actions.payload.id]: {data: actions.payload}};
            return {
                ...state,
                feeds,
                feedMap
            };
        }
        case EFeedActionTypes.ADD_FEED_ERROR:
            return {
                ...state,
                feedMap: {
                    ...state.feedMap,
                    [actions.payload.id]: {error: actions.payload.error}
                }
            };
        case EFeedActionTypes.FETCH_FEED_SUCCESS:
        case EFeedActionTypes.UPDATE_FEED_SUCCESS: {
            const feeds = state.feeds.map((feed) => {
                if (feed.id === actions.payload.id) {
                    return {...actions.payload};
                }
                return feed;
            });
            const feedMap = {...state.feedMap, [actions.payload.id]: {data: actions.payload}};
            return {
                ...state,
                feeds,
                feedMap
            };
        }
        case EFeedActionTypes.UPDATE_FEED_ERROR:
            return {
                ...state,
                feedMap: {
                    ...state.feedMap,
                    [actions.payload.id]: {error: actions.payload.error}
                }
            };
        case EFeedActionTypes.REMOVE_FEED_SUCCESS: {
            const feeds = state.feeds.filter((feed) => feed.id !== actions.payload);
            const feedMap = {...state.feedMap};
            delete feedMap[actions.payload];
            
            return {
                ...state,
                feeds,
                feedMap
            };
        }
        case EFeedActionTypes.REMOVE_FEED_ERROR:
            return {
                ...state,
                feedMap: {
                    ...state.feedMap,
                    [actions.payload.id]: {error: actions.payload.error}
                }
            };
        default:
            return state;

    }
};
