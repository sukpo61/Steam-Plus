const HomeIcon = ({ selected = false }: { selected: boolean }) => {
    const iconColor = selected ? '#00B8C8' : '#777D87';

    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_2310_6729)">
                <path
                    d="M16.6666 33.3333V23.3333H23.3333V33.3333H31.6666V20H36.6666L19.9999 5L3.33325 20H8.33325V33.3333H16.6666Z"
                    fill={iconColor}
                />
            </g>
            <defs>
                <clipPath id="clip0_2310_6729">
                    <rect width="40" height="40" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default HomeIcon;
