export const DotIcon = (
  props: React.SVGProps<SVGSVGElement> & { color?: "black" | "white" }
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="7"
    height="7"
    fill="none"
    viewBox="0 0 7 7"
    {...props}
  >
    <circle
      cx="3.5"
      cy="3.5"
      r="3.5"
      fill={props.color === "white" ? "#fff" : "#000"}
    ></circle>
  </svg>
);
