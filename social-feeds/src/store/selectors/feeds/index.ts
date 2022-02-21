import {createSelector} from 'reselect';
import { ESliceName, TStoreState, TFeed } from '../../store.definition';
import { sliceSelector } from '../selector.utils';

const sliceName = ESliceName.FeedSlice;

export const feedMapSelector = createSelector(sliceSelector, (slice: TStoreState): Record<string, {
    data?: TFeed;
    error?: Error;
}> => {
    return slice[sliceName].feedMap;
});

export const feedListSelector = createSelector(sliceSelector, (slice: TStoreState): TFeed[] => {
    return slice[sliceName].feeds;
});
