import { TActiveUser } from '../../store.definition';

export enum EUserActionTypes {
    LOAD_USER_LIST_SUCCESS = 'LOAD_USER_LISTSUCCESS',
    LOAD_USER_LIST_ERROR = 'LOAD_USER_LIST_ERROR'
};

interface ILoadUserListSuccess {
    type: EUserActionTypes.LOAD_USER_LIST_SUCCESS,
    payload: TActiveUser[]
};

interface ILoadUserListError {
    type: EUserActionTypes.LOAD_USER_LIST_ERROR,
    payload: Error
};

export type TUserActions = ILoadUserListSuccess | ILoadUserListError;
