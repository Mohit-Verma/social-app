import {createSelector} from 'reselect';
import { ESliceName, TActiveUser, TStoreState } from '../../store.definition';
import { sliceSelector } from '../selector.utils';

const sliceName = ESliceName.ActiveUserSlice;

export const getActiveUser = createSelector(sliceSelector, (slice: TStoreState): TActiveUser => {
    return slice[sliceName];
});
