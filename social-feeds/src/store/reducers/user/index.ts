import { TUserActions } from '../../actions/user';
import { EUserActionTypes } from '../../actions/user/user.definition';
import { TUser } from '../../store.definition';

const initState: TUser = {
    users: []
};

export const userReducer = (state = initState, actions: TUserActions): TUser => {
    switch (actions.type) {
        case EUserActionTypes.LOAD_USER_LIST_SUCCESS:
            return {users: actions.payload};
        default:
            return state;
    }
};
