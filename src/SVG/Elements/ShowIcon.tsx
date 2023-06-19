export const ShowIcon = ({
  show,
  onToggle,
}: {
  show: boolean;
  onToggle: (a: any) => void;
}) => (
  <svg
    onClick={() => {
      onToggle(!show);
    }}
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={17}
    className="hover:brightness-110"
    role="button"
    fill="none"
  >
    <rect
      width={17}
      height={17}
      x={0.266}
      fill={!show ? '#282B39' : ' bg-blue'}
      rx={2}
    />
    <path
      fill="#C3C2D4"
      fillRule="evenodd"
      d="M8.482 4.69a6.287 6.287 0 0 1 3.04.82 7.455 7.455 0 0 1 1.513 1.128c.473.45.866.95 1.229 1.497a.394.394 0 0 1 0 .451 8.384 8.384 0 0 1-1.765 1.98c-.819.644-1.717 1.095-2.725 1.32-.362.081-.74.13-1.118.13a6.134 6.134 0 0 1-2.285-.37 6.733 6.733 0 0 1-1.67-.903 8.24 8.24 0 0 1-1.858-1.932c-.063-.08-.11-.16-.174-.257a.372.372 0 0 1 0-.403c.678-1.062 1.544-1.948 2.615-2.576a6.197 6.197 0 0 1 2.474-.837c.252-.016.488-.032.724-.049Zm-.063 6.585c.347 0 .63-.016.914-.065a5.644 5.644 0 0 0 2.237-.885 7.39 7.39 0 0 0 1.938-1.916c.031-.032.031-.065 0-.097a9.221 9.221 0 0 0-.883-1.062c-.535-.532-1.134-.983-1.827-1.289a5.502 5.502 0 0 0-3.088-.466 5.402 5.402 0 0 0-2.331.901 7.51 7.51 0 0 0-1.953 1.932c-.016.033-.016.049 0 .08.267.387.567.742.897 1.08a6.333 6.333 0 0 0 1.639 1.191c.803.387 1.638.596 2.457.596Z"
      clipRule="evenodd"
    />
    <path
      fill="#C3C2D4"
      fillRule="evenodd"
      d="M8.668 10.21a1.951 1.951 0 0 1-1.954-1.97 1.98 1.98 0 0 1 1.923-1.938c1.1-.015 2 .885 1.985 1.984a1.961 1.961 0 0 1-1.954 1.924ZM9.92 8.256c0-.687-.565-1.252-1.252-1.252-.718 0-1.267.595-1.267 1.267a1.26 1.26 0 0 0 2.519-.015Z"
      clipRule="evenodd"
    />
    <circle cx={8.668} cy={8.256} r={1.466} fill="#C3C2D4" />
  </svg>
);
