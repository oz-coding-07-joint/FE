import { useState, useEffect } from "react";
import Button from "./Button";

interface CustomInputProps {
  type: "text" | "email" | "password" | "number";
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  validateInput?: (value: string) => string | undefined;
  button?: React.ReactElement<typeof Button>;
  error?: string; //부모 컴포넌트에서 전달하는 에러 메시지
}

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  validateInput,
  button,
  error: externalError,
}: CustomInputProps) {
  const [internalError, setInternalError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (externalError) {
      setInternalError(externalError);
    }
  }, [externalError]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(e);
  
    if (validateInput) {
      const errorMessage = validateInput(newValue);
      setInternalError(errorMessage || externalError || undefined);
    }
  };
  

  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={`w-full h-12 px-2.5 text-muted-400 placeholder-muted-300 border rounded-sm focus:outline-none focus:ring-2 ${
          disabled
            ? "bg-[#f1f1f1] text-muted-300 border-muted-200 cursor-not-allowed opacity-50"
            : internalError
            ? "border-secondary-500 bg-secondary-100 focus:ring-secondary-500"
            : "border-muted-200 focus:ring-primary-500"
        } ${button ? "pr-20" : ""}`}
      />


      {button && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <Button {...button.props} />
        </div>
      )}

      {internalError && <p className="mt-1 text-secondary-500 text-xs">{internalError}</p>}
    </div>
  );
}
