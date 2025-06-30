import { sizeVarient, type IconProps } from ".";

export const YoutubeIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={`${sizeVarient[props.size]}`}
    >
      <path d="M23.498 6.186a2.997 2.997 0 0 0-2.11-2.116C19.692 3.5 12 3.5 12 3.5s-7.692 0-9.387.57a2.997 2.997 0 0 0-2.11 2.116A31.216 31.216 0 0 0 0 12a31.217 31.217 0 0 0 .503 5.814 2.997 2.997 0 0 0 2.11 2.116c1.695.57 9.387.57 9.387.57s7.692 0 9.387-.57a2.997 2.997 0 0 0 2.11-2.116A31.217 31.217 0 0 0 24 12a31.216 31.216 0 0 0-.502-5.814zM9.75 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  );
};
