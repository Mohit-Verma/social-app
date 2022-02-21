import { EReaction } from '../common';

export enum ESliceName {
    CommentSlice = 'CommentSlice',
    FeedSlice = 'FeedSlice',
    ActiveUserSlice = 'ActiveUserSlice',
    UserSlice = 'UserSlice'
};

export type TActiveUser = {
    id: string;
    displayName: string;
};

export type TUser = {
    users: TActiveUser[]
}

export type TComment = {
    id: string,
    comment: string,
    userId: string,
    feedId: string
};

export type TFeed = {
    id: string;
    imageURL: string;
    description: string;
    userId: string;
    reactions: Record<string, EReaction>;
    comments: string[];
};

export type TCommentSlice = {
    commentMap: Record<string, {
        data?: TComment;
        error?: Error;
    }>;
    error?: Error;
};

export type TFeedSlice = {
    feedMap: Record<string, {
        data?: TFeed;
        error?: Error;
    }>;
    feeds: TFeed[];
    error?: Error;
};

export type TStoreState = {
    [ESliceName.CommentSlice]: TCommentSlice;
    [ESliceName.FeedSlice]: TFeedSlice;
    [ESliceName.ActiveUserSlice]: TActiveUser;
    [ESliceName.UserSlice]: TUser
};
