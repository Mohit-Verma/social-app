import Feeds from './components/feed-list/feed-list';
import './App.scss';
import { connect} from 'react-redux';
import { TStoreState } from './store/store.definition';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { ActiveUserActions } from './store/actions/active-user';
import { Box, Button} from './ui-library';
import { useState } from 'react';

interface IMapState {
    activeUserId: string;
    activeUserName: string;
};

interface IMapDispatchProps {
    setActiveUser: (userName: string) => void;
};

type IProps = IMapState & IMapDispatchProps;

const mapStateToProps = (state: TStoreState): IMapState => {
    return {
        activeUserId: state.ActiveUserSlice.id,
        activeUserName: state.ActiveUserSlice.displayName
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IMapDispatchProps => {
    const {setActiveUser} = bindActionCreators(ActiveUserActions, dispatch);

    return {
        setActiveUser: async (userName) => await setActiveUser(userName)
    };
};

const App: React.FunctionComponent<IProps> = (props: IProps): JSX.Element | null => {
    const [activeUser, setActiveUser] = useState(props.activeUserName);

    const updateActiveUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newUserName = event.target.value?.trim();
        setActiveUser(newUserName);
    };

    const onKeyDownAction = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.code === 'Enter') {
            const newUserName = event.currentTarget.value.trim();
            if (newUserName) {
                props.setActiveUser(newUserName);
            }
        }
    };

    return (props.activeUserId) ? (
        <Feeds />
    ) : (
        <div className="component-app-login">
            <Box externalStyle='component-app-login-box' childElement={(
                <>
                    <div className="component-login-username">
                        <input type="text" onChange={updateActiveUserName} onKeyDown={onKeyDownAction} placeholder="Enter your Name" value={activeUser} />
                    </div>
                    <div className="component-login-submit">
                        <Button externalStyle='component-login-submit-button' label='Login' onClick={() => props.setActiveUser(activeUser)} />
                    </div>
                </>
            )}/>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
