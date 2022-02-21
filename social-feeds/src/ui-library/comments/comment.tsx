import classNames from 'classnames';
import { useEffect, useState } from 'react';
import {isEqual} from 'lodash';
import {CommentInput} from '../comment-input';

type TCommentProps = {
    comments: {id: string, comment: string, canModify: boolean}[];
    updateComment?: (commentId: string, comment: string) => void;
    removeComment?: (commentId: string) => void;
    externalStyle?: string;
};

export const Comments: React.FunctionComponent<TCommentProps> = (props: TCommentProps): JSX.Element => {
    const {comments, externalStyle} = props;
    const [commentList, updateCommentList] = useState(comments);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editedComment, setEditedComment] = useState('');

    useEffect(() => {
        if (!isEqual(commentList, comments)) {
            updateCommentList(comments);
        }
    }, [commentList, comments]);

    const updateComment = (commentId: string, comment: string): void => {
        setEditingIndex(-1);
        setEditedComment('');
        props.updateComment?.(commentId, comment);
    };

    const cancelUpdate = () => {
        setEditingIndex(-1);
        setEditedComment('');
    };

    return (
        <>
            {commentList.map((comment, index) => (
                <div key={`comment_${index}`} className={classNames("ui-library-comment", externalStyle)}>
                    {(editingIndex === index) ? (
                        <>
                            <CommentInput defaultValue={comment.comment} name="comment-edit" onInputChange={setEditedComment} />
                            <button onClick={() => updateComment(comment.id, editedComment)}> Update </button>
                            <button onClick={cancelUpdate}> Cancel </button>
                        </>
                    ) : (
                        <span> {comment.comment} </span>
                    )}
                    {(comment.canModify && editingIndex !== index) && (
                        <>
                            <button onClick={() => setEditingIndex(index)}> Edit </button>
                            <button onClick={() => props.removeComment?.(comment.id)}> Remove </button>
                        </>
                    )}
                </div>
            ))}
        </>
    );
};
