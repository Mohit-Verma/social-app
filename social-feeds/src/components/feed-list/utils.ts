import { EReaction } from '../../common';

type TReactions = Array<{count: number; reactionType: EReaction}>

export const convertReactionsToArray = (reactionData?: Record<string, EReaction>): TReactions => {
    const reactions: TReactions = [];
    const reactionMap: Record<EReaction, number> = {
        LIKE: 0,
        CELEBRATE: 0,
        SUPPORT: 0,
        LOVE: 0
    };

    if (reactionData) {
        Object.keys(reactionData).forEach((key: string) => {
            const type = reactionData[key];
            reactionMap[type] +=  1;
        });
        
        Object.keys(reactionMap).forEach((type) => {
            const reactionType = type as EReaction;
            if (reactionMap[reactionType]) {
                reactions.push({
                    reactionType,
                    count: reactionMap[reactionType]
                });
            }
        });
    }

    return reactions;
};
