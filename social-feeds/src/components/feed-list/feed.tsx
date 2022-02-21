import {ThumbUpAltOutlined as LikeIcon, MessageOutlined as CommentIcon} from '@material-ui/icons';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import { TActiveUser, TComment, TFeed } from '../../store';
import { Box, Button, CommentInput, Comments, Reactions, Selector } from '../../ui-library';
import { EReaction } from '../../common';
import { convertReactionsToArray } from './utils';

type TFeedProps = {
    feed: TFeed;
    author: TActiveUser;
    comments: TComment[],
    user: TActiveUser;
    updateFeed: (feed: TFeed) => void;
    addComment: (comment: TComment) => void;
    updateComment: (comment: TComment) => void;
    removeComment: (commentId: string) => void;
}

export const Feed: React.FunctionComponent<TFeedProps> = (props:TFeedProps) => {
    const {feed, author, comments, user, addComment, removeComment, updateComment, updateFeed} = props;
    const reactions = convertReactionsToArray(feed.reactions);
    const supportedReactions = [
        {[EReaction.LIKE]: 'Liked'},
        {[EReaction.CELEBRATE]: 'Celebrated'},
        {[EReaction.SUPPORT]: 'Supported'},
        {[EReaction.LOVE]: 'Loved'}
    ];

    const [newComment, setNewComment] = useState('');
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [showReactionSelector, setShowReactionSelector] = useState(false);

    const onReactionSelect = (reaction: EReaction) => {
        const updatedReactions = {
            ...feed.reactions,
            [user.id]: reaction
        };
        updateFeed({...feed, reactions: updatedReactions});
        setShowReactionSelector(false);
    };

    const onCommentChange = (input: string): void => {
        setNewComment(input.trim());
    };

    const onCommentUpdate = (commentId: string, commentData: string): void => {
        const comment: TComment | undefined = comments.find((comment) => comment.id === commentId);
        if (comment) {
            updateComment({...comment, comment: commentData});
        }
    };

    const onRemoveComment = (commnetId: string): void => {
        const updatedFeedComments = feed.comments.filter((id) => id !== commnetId);
        updateFeed({
            ...feed,
            comments: updatedFeedComments
        })
        removeComment(commnetId);
    };

    const onSubmit = () => {
        const newCommentData: TComment= {
            id: uuidv4(),
            feedId: feed.id,
            userId: user.id,
            comment: newComment
        };
        addComment(newCommentData);
        updateFeed({
            ...feed,
            comments: [...feed.comments, newCommentData.id]
        })
        setNewComment('');
        setShowCommentInput(false);
    };

    const getBoxContent = (): JSX.Element => {
        return (
            <>
                <div className="component-feed-title">
                    <h3> By {author?.displayName} </h3>
                </div>
                <div className="component-feed-image">
                    <img alt={feed.description} src={feed.imageURL} />
                </div>
                <div className="component-feed-description">
                    <span> {feed.description} </span>
                </div>
                <div className="component-feed-reaction-list">
                    <Reactions reactions={reactions}/>
                </div>
                <div className="component-feed-like-comment">
                    <div className="component-feed-like" onClick={() => setShowReactionSelector(true)}>
                        <LikeIcon />
                    </div>
                    {(showReactionSelector) && (
                        <div className="component-feed-raction-selector">
                            <Selector
                                items={supportedReactions}
                                onItemSelect={(reaction) => onReactionSelect(Object.keys(reaction)[0] as EReaction)}
                                renderItem={(reaction) => (
                                    <span> {Object.values(reaction)[0]} </span>
                                )} />
                        </div>
                    )}
                    <div className="component-feed-comment" onClick={() => setShowCommentInput(!showCommentInput)}>
                        <CommentIcon />
                        {/* <span> ({comments.length}) </span> */}
                    </div>
                </div>
                {(!!comments.length) && (
                    <div className="component-comment-list">
                        <Comments
                            comments={comments.map((comment) => ({id: comment.id, comment: comment.comment, canModify: comment.userId === user.id}))}
                            updateComment={onCommentUpdate}
                            removeComment={onRemoveComment}/>
                    </div>
                )}
                {(showCommentInput) && (
                    <div className="component-comment-submit">
                        <div className="component-comment-input">
                            <CommentInput name="comment" placeholder="Write your comment here..." onInputChange={onCommentChange} defaultValue={newComment} />
                        </div>
                        <div className="component-submit">
                            <Button label="Submit" actionType={Button.ActionType.SUBMIT} size={Button.Size.SMALL} onClick={onSubmit}/>
                        </div>
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="component-feed">
            <Box externalStyle="component-feed-box" childElement={getBoxContent()}/>
        </div>
    )
};