import * as React from 'react';

import { cn } from 'lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-10 w-full items-center rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm focus-within:ring-2 focus-within:ring-gray focus-within:ring-opacity-60',
          className
        )}
      >
        <input
          type={type}
          ref={ref}
          {...props}
          className="flex w-full text-borrowDark bg-transparent focus-visible:outline-none"
        />
        {icon}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
