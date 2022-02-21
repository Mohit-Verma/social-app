import { TActiveUser } from '../../store.definition';

export enum EActiveUserActionTypes {
    SET_ACTIVE_USER_SUCCESS = 'SET_ACTIVE_USER_SUCCESS',
    SET_ACTIVE_USER_ERROR = 'SET_ACTIVE_USER_ERROR'
};

interface ISetActiveUserSuccess {
    type: EActiveUserActionTypes.SET_ACTIVE_USER_SUCCESS,
    payload: TActiveUser
};

interface ISetActiveUserError {
    type: EActiveUserActionTypes.SET_ACTIVE_USER_ERROR,
    payload: Error
};

export type TActiveUserActions = ISetActiveUserSuccess | ISetActiveUserError;
