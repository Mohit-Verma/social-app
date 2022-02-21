import classNames from 'classnames';
import { EReaction } from '../../common';

type TReaction = {
    count: number;
    reactionType: EReaction;
};

type TReactionsProps = {
    reactions: TReaction[];
    externalStyle?: string;
    onClick?: (selectedReaction: TReaction) => void;
};

type TReactionsComponent<P> = React.FunctionComponent<P> & {
    ReactionType: typeof EReaction;
};

const reaction = {
    [EReaction.LIKE]: 'Liked',
    [EReaction.CELEBRATE]: 'Celebrated',
    [EReaction.SUPPORT]: 'Supported',
    [EReaction.LOVE]: 'Loved'
};

export const Reactions: TReactionsComponent<TReactionsProps> = (props: TReactionsProps): JSX.Element => {
    const {reactions = [], externalStyle, onClick} = props;
    return (
        <div className={classNames("ui-library-reactions", externalStyle)}>
            {reactions.map((reactionMeta: TReaction): JSX.Element => {
                const {count, reactionType} = reactionMeta;
                const reactionLabel = reaction[reactionType];
                return (
                    <span
                        key={`ui-library-reaction-${reactionLabel}`}
                        className={classNames(reactionLabel.toLowerCase())}
                        onClick={() => onClick?.(reactionMeta)}>
                        {`${count} ${reactionLabel}`}
                    </span>
                );
            })}
        </div>
    );
};

Reactions.ReactionType = EReaction;
