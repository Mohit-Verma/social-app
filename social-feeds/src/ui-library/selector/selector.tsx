type TSelectorProps = {
    items: Array<any>;
    onItemSelect: (item: any) => void;
    renderItem: (item: any) => JSX.Element;
};

export const Selector: React.FunctionComponent<TSelectorProps> = (props: TSelectorProps): JSX.Element | null => {
    const {items, onItemSelect, renderItem} = props;

    return (items.length) ? (
        <div className="ui-library-selector">
            {items.map((item, index) => (
                <div className="ui-library-selector-item" key={`selector-item-${index}`} onClick={() => onItemSelect(item)}>
                    {renderItem(item)}
                </div>
            ))}
        </div>
    ) : null;
};