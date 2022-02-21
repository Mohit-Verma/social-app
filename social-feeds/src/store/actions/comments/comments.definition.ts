import { TComment } from '../../store.definition';

export enum ECommentActionTypes {
    FETCH_COMMENT_SUCCESS = 'FETCH_COMMENT_SUCCESS',
    FETCH_COMMENT_ERROR = 'FETCH_COMMENT_ERROR',
    FETCH_COMMENT_LIST_SUCCESS = 'FETCH_COMMENT_LIST_SUCCESS',
    FETCH_COMMENT_LIST_ERROR = 'FETCH_COMMENT_LIST_ERROR',
    ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS',
    ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR',
    UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS',
    UPDATE_COMMENT_ERROR = 'UPDATE_COMMENT_ERROR',
    REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS',
    REMOVE_COMMENT_ERROR = 'REMOVE_COMMENT_ERROR'
};

interface IFetchCommentSuccessAction {
    type: ECommentActionTypes.FETCH_COMMENT_SUCCESS;
    payload: TComment;
};

interface IFetchCommentErrorAction {
    type: ECommentActionTypes.FETCH_COMMENT_ERROR;
    payload: {id: string; error: Error};
};

interface IFetchCommentListSuccessAction {
    type: ECommentActionTypes.FETCH_COMMENT_LIST_SUCCESS;
    payload: TComment[];
};

interface IFetchCommentListErrorAction {
    type: ECommentActionTypes.FETCH_COMMENT_LIST_ERROR;
    payload: Error;
};

interface IAddCommentSuccessAction {
    type: ECommentActionTypes.ADD_COMMENT_SUCCESS;
    payload: TComment;
};

interface IUpdateCommentSuccessAction {
    type: ECommentActionTypes.UPDATE_COMMENT_SUCCESS;
    payload: TComment;
};

interface IRemoveCommentSuccessAction {
    type: ECommentActionTypes.REMOVE_COMMENT_SUCCESS;
    payload: {id: string};
};

interface IAddCommentErrorAction {
    type: ECommentActionTypes.ADD_COMMENT_ERROR;
    payload: {id: string; error: Error};
};

interface IUpdateCommentErrorAction {
    type: ECommentActionTypes.UPDATE_COMMENT_ERROR;
    payload: {id: string; error: Error};
};

interface IRemoveCommentErrorAction {
    type: ECommentActionTypes.REMOVE_COMMENT_ERROR;
    payload: {id: string; error: Error};
};

export type TCommentActions =

    IFetchCommentSuccessAction |
    IFetchCommentErrorAction |

    IFetchCommentListSuccessAction|
    IFetchCommentListErrorAction |

    IAddCommentSuccessAction |
    IAddCommentErrorAction |

    IUpdateCommentSuccessAction |
    IUpdateCommentErrorAction |

    IRemoveCommentSuccessAction |
    IRemoveCommentErrorAction;
