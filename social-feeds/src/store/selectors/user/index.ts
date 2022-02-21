import {createSelector} from 'reselect';
import { ESliceName, TStoreState, TActiveUser } from '../../store.definition';
import { sliceSelector } from '../selector.utils';

const sliceName = ESliceName.UserSlice;

export const getUsers = createSelector(sliceSelector, (slice: TStoreState): TActiveUser[] => {
    return slice[sliceName].users;
});
