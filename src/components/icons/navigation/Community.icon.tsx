const CommunityIcon = ({ selected = false }: { selected: boolean }) => {
    const iconColor = selected ? '#00B8C8' : '#777D87';

    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_2310_6739)">
                <path
                    d="M12.8 12.7998H9.19995V25.3998C9.19995 27.3798 10.82 28.9998 12.8 28.9998H29V25.3998H12.8V12.7998Z"
                    fill={iconColor}
                />
                <path
                    d="M34.3999 3.7998H19.9999C18.0199 3.7998 16.3999 5.4198 16.3999 7.3998V18.1998C16.3999 20.1798 18.0199 21.7998 19.9999 21.7998H34.3999C36.3799 21.7998 37.9999 20.1798 37.9999 18.1998V7.3998C37.9999 5.4198 36.3799 3.7998 34.3999 3.7998ZM34.3999 18.1998H19.9999V10.9998H34.3999V18.1998Z"
                    fill={iconColor}
                />
                <path
                    d="M5.6 20H2V32.6C2 34.58 3.62 36.2 5.6 36.2H21.8V32.6H5.6V20Z"
                    fill={iconColor}
                />
            </g>
            <defs>
                <clipPath id="clip0_2310_6739">
                    <rect width="40" height="40" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default CommunityIcon;
