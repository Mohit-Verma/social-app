import {Dispatch} from 'redux';
import {ServiceRequest, urls} from '../../../bifrost';
import { getUsers } from '../../selectors/user';
import { TActiveUser, TStoreState } from '../../store.definition';
import { EUserActionTypes, TUserActions } from './user.definition';

export const getUserList = (state: TStoreState): TActiveUser[] => {
    return getUsers(state);
};

export const loadAllUsers = () => {
    return async (dispatch: Dispatch<TUserActions>) => {
        const {status, data: users = []} = await ServiceRequest.get(urls.users);
        if (status === 200 && users.length) {
            dispatch({
                type: EUserActionTypes.LOAD_USER_LIST_SUCCESS,
                payload: users
            });
        }
    };
};
