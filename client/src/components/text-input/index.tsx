import React from 'react';
import { Input } from 'components/ui/input';

interface TextInputProps {
  label: string;
  type: string;
  width?: string;
  height?:string;
  error?: boolean;
  errorMessage?: string;
  icon?: React.ReactNode;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, type, width, height, error, errorMessage, icon, ...props }, ref) => {
    const divWidth = width ? width : 'w-full';
     const inputHeight = height ? height : "h-10"
    return (
      <div className={`flex-col ${divWidth}`}>
        <h2 className="text-borrow font-semibold font-nunito">{label}</h2>
        <Input
          type={type}
          ref={ref}
          icon={icon}
          {...props}
          className={`focus-visible:ring-neutral-400 font-nunito text-borrowDark ${inputHeight} ${error ? 'border-red-500' : 'border-gray'}`}
        />
        {error && (
          <p className="text-red-500 font-nunito font-semibold text-sm">
            *{errorMessage}
          </p>
        )}
      </div>
    );
  }
);
TextInput.displayName = 'TextInput';