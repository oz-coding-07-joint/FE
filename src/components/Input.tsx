import { useState, useEffect } from "react";
import Button from "./Button";

interface CustomInputProps {
  type: "text" | "email" | "password" | "number";
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // ✅ optional로 변경
  disabled?: boolean;
  button?: React.ReactElement<typeof Button>;
  error?: boolean;
  onEnterPress?: () => void;
}

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  button,
  error = false,
  onEnterPress,
}: CustomInputProps) {
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setHasError(error);
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnterPress) {
      onEnterPress();
    }
  };

  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        className={`w-full h-12 px-2.5 text-muted-400 placeholder-muted-300 border rounded-sm focus:outline-none focus:ring-2 transition-all ${
          disabled
            ? "bg-[#f1f1f1] text-muted-300 border-muted-200 cursor-not-allowed opacity-50"
            : hasError
            ? "border-secondary-500 bg-secondary-100 focus:ring-secondary-500"
            : "border-muted-200 focus:ring-primary-500"
        } ${button ? "pr-20" : ""}`}
      />

      {button && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <Button {...button.props} />
        </div>
      )}
    </div>
  );
}
