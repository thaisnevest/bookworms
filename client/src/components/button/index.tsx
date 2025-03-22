import React from 'react';
import { Button } from 'components/ui/button';

const ButtonVariant = {
  borrow: 'bg-borrow text-white',
  dark: 'bg-borrowDark text-white',
  gray: 'bg-gray text-borrowDark'
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant: keyof typeof ButtonVariant;
  width?: string;
}

export const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, width, label, ...props }, ref) => {
    const properties = ButtonVariant[variant];
    const divWidth = width ? width : 'w-full';

    return (
      <Button
        className={`${properties} font-semibold font-nunito hover:opacity-80 ${divWidth}`}
        ref={ref}
        {...props}
      >
        {label}
      </Button>
    );
  }
);
CustomButton.displayName = 'CustomButton';
