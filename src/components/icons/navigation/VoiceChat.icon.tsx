const VoiceChatIcon = ({ selected = false }: { selected: boolean }) => {
    const iconColor = selected ? '#00B8C8' : '#777D87';

    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_2310_3046)">
                <path
                    d="M33.3333 3.33301H6.66659C4.83325 3.33301 3.34992 4.83301 3.34992 6.66634L3.33325 36.6663L9.99992 29.9997H33.3333C35.1666 29.9997 36.6666 28.4997 36.6666 26.6663V6.66634C36.6666 4.83301 35.1666 3.33301 33.3333 3.33301ZM29.9999 23.333L23.3333 17.9997V23.333H9.99992V9.99967H23.3333V15.333L29.9999 9.99967V23.333Z"
                    fill={iconColor}
                />
            </g>
            <defs>
                <clipPath id="clip0_2310_3046">
                    <rect width="40" height="40" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default VoiceChatIcon;
