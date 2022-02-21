import classNames from 'classnames';
import { EActionType, EShape, ESize, EType } from './button.defintion';

type TButtonProps = {
    label: string;
    type?: EType;
    size?: ESize;
    shape?: EShape;
    actionType?: EActionType;
    externalStyle?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

type TButtonComponent<P> = React.FunctionComponent<P> & {
    Type: typeof EType;
    Size: typeof ESize;
    Shape: typeof EShape;
    ActionType: typeof EActionType;
};

type TButtonAction = "button" | "reset" | "submit";

export const Button: TButtonComponent<TButtonProps> = (props: TButtonProps): JSX.Element => {
    const {
        type = EType.PRIMARY,
        size = ESize.MEDIUM,
        shape = EShape.ROUNDED,
        actionType = EActionType.BUTTON,
        onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { },
        label,
        externalStyle
    } = props;

    const styledClassNames: string[] = ['ui-library-button'];
    const buttonActionMap: Record<EActionType, TButtonAction> = {
        [EActionType.BUTTON]: 'button',
        [EActionType.RESET]: 'reset',
        [EActionType.SUBMIT]: 'submit'
    };

    switch (type) {
        case EType.PRIMARY:
            styledClassNames.push('primary');
            break;
        case EType.SECONDARY:
            styledClassNames.push('secondary');
            break;
        case EType.DANGER:
            styledClassNames.push('danger');
            break;
        case EType.INVERSE:
            styledClassNames.push('inverse');
            break;
        default:
            break;
    };

    switch (shape) {
        case EShape.ROUNDED:
            styledClassNames.push('rounded');
            break;
        case EShape.CIRCULAR:
            styledClassNames.push('circular');
            break;
        default:
            break;
    };

    switch (size) {
        case ESize.XSMALL:
            styledClassNames.push('xsmall');
            break;
        case ESize.SMALL:
            styledClassNames.push('small');
            break;
        case ESize.LARGE:
            styledClassNames.push('large');
            break;
        case ESize.XLARGE:
            styledClassNames.push('xlarge');
            break;
        default:
            styledClassNames.push('medium');
            break;
    }

    return (
        <button
            className={classNames(...styledClassNames, externalStyle)}
            type={buttonActionMap[actionType]}
            onClick={onClick}>
            {label}
        </button>
    );
};

Button.Type = EType;
Button.Size = ESize;
Button.Shape = EShape;
Button.ActionType = EActionType;
