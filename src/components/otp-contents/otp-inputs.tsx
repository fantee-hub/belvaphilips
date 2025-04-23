"use client";
import { useState, useRef } from "react";
import { Input } from "../ui/input";

export const OTPInput = ({
  length,
  onChange,
}: {
  length: number;
  onChange: (otp: string) => void;
}) => {
  const [otpValues, setOtpValues] = useState<string[]>(
    new Array(length).fill("")
  );
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.slice(0, 1);
    setOtpValues(newOtpValues);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    onChange(newOtpValues.join(""));
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newOtpValues = [...otpValues];
      newOtpValues[index - 1] = "";
      setOtpValues(newOtpValues);
      onChange(newOtpValues.join(""));
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .slice(0, length)
      .split("");
    const newOtpValues = [...otpValues];
    for (let i = 0; i < length; i++) {
      newOtpValues[i] = pastedData[i] || "";
    }
    setOtpValues(newOtpValues);
    onChange(newOtpValues.join(""));

    const firstEmptyIndex = newOtpValues.findIndex((val) => !val);
    inputRefs.current[
      firstEmptyIndex >= 0 ? firstEmptyIndex : length - 1
    ]?.focus();
  };

  return (
    <main>
      <div className="flex gap-2 mb-4">
        {Array.from({ length }, (_, index) => (
          <Input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            maxLength={1}
            value={otpValues[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            ref={(el: HTMLInputElement | null) => {
              if (el) inputRefs.current[index] = el;
            }}
            className="w-[47px] h-[47px] text-center text-lg bg-[#F4F4F4] custom-otp-input rounded-full"
            autoFocus={index === 0}
          />
        ))}
      </div>
    </main>
  );
};
