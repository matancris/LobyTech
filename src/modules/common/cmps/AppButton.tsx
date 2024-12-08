import { Loader } from "./Loader";


interface Props {
    text: string;
    type?: string;
    isDisabled?: boolean;
    PrefixIcon?: any;
    isFullWidth?: boolean;
    isExtraWide?: boolean;
    onClick?: (ev: any) => void;
    isLoading?: boolean;
}

// TODO: Fix the prefix problem
export const AppButton = ({ text, PrefixIcon, isDisabled = false, type = 'primary', isFullWidth, isExtraWide, onClick, isLoading }: Props) => {
    const btnClass = `${type} ${isDisabled ? 'disabled' : ''} ${isFullWidth ? 'full-width' : ''} ${isExtraWide ? 'extra-wide' : ''}`

    return (
        <section className={`app-btn flex center-center ${btnClass}`}>
            {isLoading && <Loader isInnerLoader size={16} color='#fff' />}
            {!isLoading && <button className='flex center-center' disabled={isDisabled} onClick={onClick}>
                {PrefixIcon && <PrefixIcon />}
                <div>{text}</div>
            </button>}
        </section>
    )
}
