import {Dispatch} from 'redux';
import {ServiceRequest, urls} from '../../../bifrost'
import { commentMapSelector } from '../../selectors/comments';
import { TComment, TStoreState } from '../../store.definition';
import { ECommentActionTypes, TCommentActions } from './comments.definition';

const _getAllCommentMap = (state: TStoreState): Record<string, {
    data?: TComment;
    error?: Error;
}> => {
    return commentMapSelector(state);
};

export const getComment = (commentId: string, state: TStoreState): TComment | undefined => {
    const commentMap = _getAllCommentMap(state);
    return commentMap[commentId]?.data;
};

export const loadAllComments = () => {
    return async (dispatch: Dispatch<TCommentActions>) => {
        const {status, data: commentList} = await ServiceRequest.get(urls.comments);
        if (status === 200)  {
            dispatch({
                type: ECommentActionTypes.FETCH_COMMENT_LIST_SUCCESS,
                payload: commentList
            });
        }
    };
};

export const loadComment = (commentId: string) => {
    return async (dispatch: Dispatch<TCommentActions>) => {
        const {status, data: comment} = await ServiceRequest.get(`${urls.comments}/${commentId}`);
        if (status === 200)  {
            dispatch({
                type: ECommentActionTypes.FETCH_COMMENT_SUCCESS,
                payload: comment
            });
        }
    };
};

export const addComment = (comment: TComment) => {
    return async (dispatch: Dispatch<TCommentActions>) => {
        const {status, data: newComment} = await ServiceRequest.post(urls.comments, comment);
        if (status === 201)  {
            dispatch({
                type: ECommentActionTypes.ADD_COMMENT_SUCCESS,
                payload: newComment
            });
        }
    };
};

export const updateComment = (comment: TComment) => {
    return async (dispatch: Dispatch<TCommentActions>) => {
        const {status, data: updatedComment} = await ServiceRequest.put(`${urls.comments}/${comment.id}`, comment);
        if (status === 200)  {
            dispatch({
                type: ECommentActionTypes.UPDATE_COMMENT_SUCCESS,
                payload: updatedComment
            });
        }
    };
};

export const removeComment = (commentId: string) => {
    return async (dispatch: Dispatch<TCommentActions>) => {
        const {status} = await ServiceRequest.delete(`${urls.comments}/${commentId}`);
        if (status === 200)  {
            dispatch({
                type: ECommentActionTypes.REMOVE_COMMENT_SUCCESS,
                payload: {id: commentId}
            });
        }
    };
};
