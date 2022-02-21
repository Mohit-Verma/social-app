import classNames from 'classnames';
import { EColor, ECorner, EShadow } from './box.definition';

type TBoxProps = {
    color?: EColor;
    corner?: ECorner;
    shadow?: EShadow;
    width?: number;
    height?: number;
    externalStyle?: string;
    childElement: React.ReactNode;
}

type TBoxComponent<P> = React.FunctionComponent<P> & {
    Color: typeof EColor;
    Corner: typeof ECorner;
    Shadow: typeof EShadow;
};

export const Box: TBoxComponent<TBoxProps> = (props: TBoxProps): JSX.Element => {
    const {
        color = EColor.WHITE,
        corner = ECorner.ROUNDED,
        shadow = EShadow.SOFT,
        width,
        height,
        childElement,
        externalStyle
    } = props;
    
    const styledClassNames: string[] = ['ui-library-box'];

    switch (color) {
        case EColor.BLACK:
            styledClassNames.push('color-black');
            break;
        case EColor.RED:
            styledClassNames.push('color-red');
            break;
        case EColor.GREEN:
            styledClassNames.push('color-green');
            break;
        case EColor.BLUE:
            styledClassNames.push('color-blue');
            break;
        case EColor.TRANSPARENT:
            styledClassNames.push('color-transparent');
            break;
        default:
            styledClassNames.push('color-white');
            break;
    };

    switch (corner) {
        case ECorner.ROUNDED:
            styledClassNames.push('corner-rounded');
            break;
        default:
            break;
    };

    switch (shadow) {
        case EShadow.SOFT:
            styledClassNames.push('shadow-soft');
            break;
        case EShadow.CARD:
            styledClassNames.push('shadow-card');
            break;
        default:
            break;
    };

    return (
        <div
            className={classNames(...styledClassNames, externalStyle)} style={{width, height}}>
            {childElement}
        </div>
    );
};

Box.Color = EColor;
Box.Corner = ECorner;
Box.Shadow = EShadow;