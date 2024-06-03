const FriendIcon = ({ selected = false }: { selected: boolean }) => {
    const iconColor = selected ? '#00B8C8' : '#777D87';

    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_2310_6750)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M27.7834 21.8838C30.0668 23.4338 31.6668 25.5338 31.6668 28.3338V33.3338H38.3334V28.3338C38.3334 24.7005 32.3834 22.5505 27.7834 21.8838Z"
                    fill={iconColor}
                />
                <path
                    d="M15.0002 20.0003C18.6821 20.0003 21.6668 17.0156 21.6668 13.3337C21.6668 9.65176 18.6821 6.66699 15.0002 6.66699C11.3183 6.66699 8.3335 9.65176 8.3335 13.3337C8.3335 17.0156 11.3183 20.0003 15.0002 20.0003Z"
                    fill={iconColor}
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M25.0001 20.0003C28.6834 20.0003 31.6668 17.017 31.6668 13.3337C31.6668 9.65033 28.6834 6.66699 25.0001 6.66699C24.2168 6.66699 23.4834 6.83366 22.7834 7.06699C24.1668 8.78366 25.0001 10.967 25.0001 13.3337C25.0001 15.7003 24.1668 17.8837 22.7834 19.6003C23.4834 19.8337 24.2168 20.0003 25.0001 20.0003Z"
                    fill={iconColor}
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.0001 21.667C10.5501 21.667 1.66675 23.9003 1.66675 28.3337V33.3337H28.3334V28.3337C28.3334 23.9003 19.4501 21.667 15.0001 21.667Z"
                    fill={iconColor}
                />
            </g>
            <defs>
                <clipPath id="clip0_2310_6750">
                    <rect width="40" height="40" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default FriendIcon;
