/* eslint-disable react-hooks/exhaustive-deps */
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import {connect} from 'react-redux';
import {isEmpty} from 'lodash';
import { FeedActions } from '../../store/actions/feeds';
import { TActiveUser, TComment, TFeed, TStoreState } from '../../store';
import { useEffect } from 'react';
import { UserActions } from '../../store/actions/user';
import { Feed } from './feed';
import './feed.style.scss';
import { CommentActions } from '../../store/actions';


interface IConnectedState {
    feeds: TFeed[];
    users: Record<string, TActiveUser>;
    activeUser: TActiveUser;
    comments: Record<string, TComment>;
};

interface IConnectedProps {
    loadFeeds: () => void;
    loadUsers: () => void;
    loadComments: () => void;
    updateFeed: (feed: TFeed) => void;
    addComment: (comment: TComment) => void;
    updateComment: (comment: TComment) => void;
    removeComment: (commentId: string) => void;
};

type TProps = IConnectedState & IConnectedProps;

const mapStateToProps = (state: TStoreState): IConnectedState => {
    const userMap: Record<string, TActiveUser> = {};
    const comments: Record<string, TComment> = {};

    if (state.CommentSlice.commentMap) {
        Object.keys(state.CommentSlice.commentMap).forEach((commentId) => {
            const commentData = state.CommentSlice.commentMap[commentId].data;
            if (commentData) {
                comments[commentId] = commentData;
            }
        });
    }

    state.UserSlice.users.forEach((user) => userMap[user.id] = user);
    return {
        feeds: state.FeedSlice.feeds,
        users: userMap,
        activeUser: state.ActiveUserSlice,
        comments
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IConnectedProps => {
    const {loadAllFeeds, updateFeed} = bindActionCreators(FeedActions, dispatch);
    const {loadAllUsers} = bindActionCreators(UserActions, dispatch);
    const {addComment, updateComment, removeComment, loadAllComments} = bindActionCreators(CommentActions, dispatch);

    return {
        loadFeeds: async () => await loadAllFeeds(),
        loadUsers: async () => await loadAllUsers(),
        loadComments: async () => await loadAllComments(),
        updateFeed: async (feed: TFeed) => {await updateFeed(feed)},
        addComment: async (comment: TComment) => await addComment(comment),
        updateComment: async (comment: TComment) => await updateComment(comment),
        removeComment: async (commentId: string) => await removeComment(commentId)
    };
};

const FeedsComponent: React.FunctionComponent<TProps> = (props: TProps): JSX.Element | null => {
    useEffect(() => {
        if (!props.feeds.length) {
            props.loadFeeds();
        }
        if (isEmpty(props.users)) {
            props.loadUsers();
        }
        if (isEmpty(props.comments)) {
            props.loadComments();
        }
    }, []);

    return (props.feeds.length) ? (
        <div className="component-feed-list-wrapper">
            {props.feeds.map((feed): JSX.Element => {
                const author = props.users[feed.userId];
                const comments = Object.keys(props.comments).filter((commentId: string) => {
                    return props.comments[commentId].feedId === feed.id;
                }).map((commentId) => props.comments[commentId]);
                return (
                    <Feed
                        key={`feed_${feed.id}`}
                        feed={feed}
                        author={author}
                        user={props.activeUser}
                        comments={comments}
                        updateFeed={props.updateFeed}
                        addComment={props.addComment}
                        updateComment={props.updateComment}
                        removeComment={props.removeComment}/>
                )
            })}
        </div>
    ) : null;
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedsComponent)