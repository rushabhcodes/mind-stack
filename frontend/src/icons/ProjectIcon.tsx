import { sizeVarient, type IconProps } from ".";

export const ProjectIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`${sizeVarient[props.size]}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7.5h18M3 12h18M3 16.5h18M6 7.5v12M18 7.5v12"
      />
    </svg>
  );
};
