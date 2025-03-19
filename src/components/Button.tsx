interface CustomButtonProps {
  label?: string;
  onClick?: () => void;
  size?: "large" | "medium" | "small" | "full";
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  type?: "button" | "submit";
}

export default function Button({
  label,
  onClick,
  size = "medium",
  variant = "primary",
  disabled = false,
  type = "button",
}: CustomButtonProps) {
  // 크기별 스타일 설정
  const sizeClasses = {
    full: "w-full h-[50px] text-lg px-20 font-pretendard font-semibold",
    large: "h-[50px] text-lg px-10 font-pretendard font-semibold",
    medium: "h-[46px] px-5 font-pretendard font-medium",
    small: "h-9 text-sm px-4 font-pretendard font-medium",
  };

  // 버튼 스타일 설정
  const variantClasses = {
    primary: "bg-primary-900 text-white",
    secondary: "bg-muted-500 text-white",
    outline: "bg-white border border-muted-200 text-muted-400",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`w-auto min-w-fit rounded-sm text-center transition duration-200 whitespace-nowrap ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {label}
    </button>
  );
}