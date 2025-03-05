import { useState } from "react";
import Button from "./Button";

interface CustomInputProps {
  type: "text" | "email" | "password" | "number";
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  height?: string;
  disabled?: boolean;
  validateInput?: (value: string) => string | undefined;
  button?: React.ReactElement<typeof Button>;
}

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  width = "100%",
  height = "50px",
  disabled = false,
  validateInput,
  button,
}: CustomInputProps) {
  const [error, setError] = useState<string | undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(e);

    if (validateInput) {
      const errorMessage = validateInput(newValue);
      setError(errorMessage || undefined);
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
        style={{ width, height }}
        className={`px-2.5 text-muted-400 placeholder-muted-300 border rounded-xs focus:outline-none focus:ring-2 ${
          disabled
            ? "bg-[#f1f1f1] text-muted-300 border-muted-200 cursor-not-allowed opacity-50"
            : error
            ? "border-secondary-500 bg-secondary-100 focus:ring-2"
            : "border-muted-200 focus:ring-secondary-500"
        } ${button ? "pr-20" : ""}`}
      />

      {button && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <Button {...button.props} />
        </div>
      )}

      {error && <p className="mt-1 text-[#239AC4] text-[11pt]">{error}</p>}
    </div>
  );
}

