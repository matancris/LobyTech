

interface Props {
    isDisabled?: boolean;
    Icon: any;
    isFullWidth?: boolean;
    onClick?: (ev: any) => void;
    className?: string;
    label?: string;
}

export const AppRoundButton = ({ Icon, isDisabled = false, onClick, className, label }: Props) => {

    return (
        <section
            className={`app-round-button flex center-center ${isDisabled ? 'disabled' : ''}${className ? className : ''}`} >
            <button className='flex center-center' disabled={isDisabled} onClick={onClick} aria-label={label}>
                {<Icon />}
            </button>
        </section>
    )
}
