import { EActiveUserActionTypes, TActiveUserActions } from '../../actions/active-user/active-user.definition';
import { TActiveUser } from '../../store.definition';


const initState: TActiveUser = {
    id: '',
    displayName: ''
};

export const activeUserReducer = (state = initState, actions: TActiveUserActions): TActiveUser => {
    switch (actions.type) {
        case EActiveUserActionTypes.SET_ACTIVE_USER_SUCCESS:
            return {...actions.payload};
        default:
            return state;
    }
};
