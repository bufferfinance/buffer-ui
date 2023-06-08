export const SearchIconSVG: React.FC<{
  svgProps?: React.SVGProps<SVGSVGElement>;
  className?: string;
}> = ({ svgProps, className }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...svgProps}
    >
      <rect
        x="0.5"
        y="0.5"
        width="29"
        height="29"
        rx="6.5"
        fill="#2C2C41"
        stroke="#232334"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24 22.9081C24 23.04 24 23.16 24 23.2919C23.9161 23.4358 23.8441 23.6156 23.7242 23.7356C23.3644 24.1073 22.8008 24.0833 22.4171 23.6876C20.8821 22.1527 19.3591 20.6297 17.8241 19.0948C17.7761 19.0468 17.7282 19.0109 17.6922 18.9629C17.6682 18.9749 17.6442 18.9869 17.6322 18.9989C15.6895 20.4259 13.543 20.8696 11.2405 20.186C8.48235 19.3586 6.79147 17.4759 6.1439 14.6699C6.08394 14.3821 6.04797 14.0943 6 13.8065C6 13.4348 6 13.0511 6 12.6793C6.01199 12.6433 6.02398 12.6074 6.03598 12.5594C6.11992 12.1037 6.1559 11.636 6.2998 11.2043C7.18721 8.47027 9.03398 6.76746 11.8401 6.1439C12.1159 6.08394 12.4037 6.04797 12.6795 6C13.0393 6 13.4111 6 13.7708 6C13.8188 6.01199 13.8548 6.02398 13.9027 6.03597C14.5863 6.08394 15.2578 6.25182 15.8934 6.50365C19.8028 8.06255 21.5656 12.5114 19.7788 16.3248C19.563 16.7924 19.2632 17.2361 18.9754 17.7278C18.9993 17.7398 19.0473 17.7757 19.0953 17.8237C20.5703 19.2987 22.0453 20.7856 23.5323 22.2606C23.7362 22.4525 23.9161 22.6443 24 22.9081ZM13.2312 18.6871C16.2172 18.6991 18.6756 16.2528 18.6756 13.2549C18.6875 10.257 16.2412 7.82272 13.2432 7.81073C10.2572 7.79874 7.81079 10.245 7.7988 13.2429C7.78681 16.2168 10.2332 18.6751 13.2312 18.6871Z"
        fill="#C3C2D4"
      />
    </svg>
  );
};
