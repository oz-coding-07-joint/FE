interface CustomButtonProps {
  label?: string;
  onClick?: () => void;
  size?: "large" | "medium" | "small" | "full";
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
}

export default function Button({
  label,
  onClick,
  size = "medium",
  variant = "primary",
  disabled = false,
}: CustomButtonProps) {
  // 크기별 스타일 설정
  const sizeClasses = {
    full: "w-full h-[50px] text-[18px] px-[40px] font-pretendard font-semibold",
    large: "h-[50px] text-[18px] px-[40px] font-pretendard font-semibold",
    medium: "h-[46px] text-[16px] px-[20px] font-pretendard font-medium",
    small: "h-[36px] text-[14px] px-[20px] font-pretendard font-medium",
  };

  // 버튼 스타일 설정
  const variantClasses = {
    primary: "bg-[#192845] text-white hover:bg-[#444444]",
    secondary: "bg-[#444444] text-white hover:bg-[#192845]",
    outline: "bg-white border border-[#ddd] text-[#666] hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-auto rounded-[3px] text-center transition duration-200 ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {label}
    </button>
  );
}

