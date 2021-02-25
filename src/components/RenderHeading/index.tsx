import './style.scss';

export type HeadingTypeInterface = 'main' | 'primary' | 'secondary' | 'para';

interface RenderHeadingType {
    className?: string;
    value: string;
    type?: HeadingTypeInterface
}

export const RenderHeading = (props: RenderHeadingType) => {
    const {className, value, type = 'secondary'} = props;
    return (
        <div className={'heading-container'}>
            <h1 className={`${className ? className : ''} heading ${type}`}>
                {value}
            </h1>
        </div>
    );
}