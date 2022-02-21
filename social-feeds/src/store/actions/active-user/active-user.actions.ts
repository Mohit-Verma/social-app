import {Dispatch} from 'redux';
import {ServiceRequest, urls} from '../../../bifrost';
import { TActiveUser, TStoreState } from '../../store.definition';
import { EActiveUserActionTypes, TActiveUserActions } from './active-user.definition';

export const getActiveUser = (state: TStoreState): TActiveUser => {
    return getActiveUser(state);
};

export const setActiveUser = (userName: string) => {
    return async (dispatch: Dispatch<TActiveUserActions>) => {
        const {status, data: users = []} = await ServiceRequest.get(urls.users);
        const user = users.find((userData: TActiveUser) => userData.displayName === userName.toLowerCase());
        if (status === 200 && user) {
            dispatch({
                type: EActiveUserActionTypes.SET_ACTIVE_USER_SUCCESS,
                payload: user
            });
        } else if (status === 200 && !user) {
            const {status: addUserStatus, data: newUser} = await ServiceRequest.post(urls.users, {id: '', displayName: userName.toLowerCase()});
            if (addUserStatus === 201 && newUser) {
                dispatch({
                    type: EActiveUserActionTypes.SET_ACTIVE_USER_SUCCESS,
                    payload: newUser
                });
            }
        }
    };
};
