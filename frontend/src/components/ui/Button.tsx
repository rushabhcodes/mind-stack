import type { ReactElement } from "react";

interface ButtonProps {
  varient: "primary" | "secondary" | "destructive";
  text: string;
  size: "sm" | "md" | "lg";
  startIcon?: ReactElement;
  endIcon?: ReactElement;
}

const variantStyles = {
  primary: "bg-purple-800 text-white",
  secondary: "bg-purple-300 text-purple-800",
  destructive: "bg-red-600 text-white",
};

const sizeStyles = {
  sm: "py-1 px-2",
  md: "px-4 py-2",
  lg: "px-6 py-4",
};

const defaultStyle = "rounded-md text-bold m-2 flex items-center";

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${variantStyles[props.varient]} ${
        sizeStyles[props.size]
      } ${defaultStyle}`}
    >
      {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}
      {props.text}
      {props.endIcon}
    </button>
  );
};
