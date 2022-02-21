import classNames from 'classnames';
import { useState } from 'react';

type TCommentInputProps = {
    name: string;
    defaultValue: string;
    placeholder?: string;
    externalStyle?: string;
    onInputChange?: (inputValue: string) => void;
};

export const CommentInput: React.FunctionComponent<TCommentInputProps> = (props: TCommentInputProps): JSX.Element => {
    const {name, placeholder = '', defaultValue, externalStyle, onInputChange = (inputValue) => {}} = props;
    const [comment, updateComment] = useState('');

    let timer: NodeJS.Timeout;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {value = ''} = event.target;
        if (value !== comment) {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                updateComment(() => {
                    onInputChange(value);
                    return value;
                });
            }, 250);
        }
    };

    return (
        <input
            className={classNames("ui-library-comment-input", externalStyle)}
            type="text" name={name}
            placeholder={placeholder}
            onChange={onChange}
            defaultValue={defaultValue}/>
    );
};
