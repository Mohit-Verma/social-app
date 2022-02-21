import { TCommentActions } from '../../actions/comments';
import { ECommentActionTypes } from '../../actions/comments/comments.definition';
import { TComment, TCommentSlice } from '../../store.definition';

const initState: TCommentSlice = {
    commentMap: {}
};

export const commentReducer = (state = initState, actions: TCommentActions): TCommentSlice => {
    switch (actions.type) {
        case ECommentActionTypes.FETCH_COMMENT_LIST_SUCCESS: {
            const comments: TComment[] = actions.payload;
            const commentMap: Record<string, {data?: TComment, error?: Error}> = {...state.commentMap};
            comments.forEach((comment) => {
                commentMap[comment.id] = {data: comment};
            });
            return {
                ...state,
                commentMap
            };
        }
        case ECommentActionTypes.FETCH_COMMENT_LIST_ERROR:
            return {
                ...state,
                error: actions.payload
            };
        case ECommentActionTypes.FETCH_COMMENT_SUCCESS:
            return {
                ...state,
                commentMap: {
                    ...state.commentMap,
                    [actions.payload.id]: {data: actions.payload}
                }
            };
        case ECommentActionTypes.FETCH_COMMENT_ERROR:
            return {
                ...state,
                commentMap: {
                    ...state.commentMap,
                    [actions.payload.id]: {error: actions.payload.error}
                }
            };
        case ECommentActionTypes.ADD_COMMENT_SUCCESS:
            return {
                ...state,
                commentMap: {
                    ...state.commentMap,
                    [actions.payload.id]: {data: actions.payload}
                }
            };
        case ECommentActionTypes.ADD_COMMENT_ERROR:
            return {
                ...state,
                commentMap: {
                    ...state.commentMap,
                    [actions.payload.id]: {error: actions.payload.error}
                }
            };
        case ECommentActionTypes.UPDATE_COMMENT_SUCCESS:
            return {
                ...state,
                commentMap: {
                    ...state.commentMap,
                    [actions.payload.id]: {data: actions.payload}
                }
            };
        case ECommentActionTypes.UPDATE_COMMENT_ERROR:
            return {
                ...state,
                commentMap: {
                    ...state.commentMap,
                    [actions.payload.id]: {error: actions.payload.error}
                }
            };
        case ECommentActionTypes.REMOVE_COMMENT_SUCCESS: {
            const updateComponentMap = {...state.commentMap};
            delete updateComponentMap[actions.payload.id];
            return {
                ...state,
                commentMap: {...updateComponentMap}
            };
        }
        case ECommentActionTypes.REMOVE_COMMENT_ERROR:
            return {
                ...state,
                commentMap: {
                    ...state.commentMap,
                    [actions.payload.id]: {error: actions.payload.error}
                }
            };
        default:
            return state;
    }
};
