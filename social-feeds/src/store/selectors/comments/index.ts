import {createSelector} from 'reselect';
import { ESliceName, TComment, TStoreState } from '../../store.definition';
import { sliceSelector } from '../selector.utils';

const sliceName = ESliceName.CommentSlice;

export const commentMapSelector = createSelector(sliceSelector, (slice: TStoreState): Record<string, {
    data?: TComment;
    error?: Error;
}> => {
    return slice[sliceName].commentMap;
});
