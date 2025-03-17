import { Button } from 'components/ui/button';

const ButtonVariant = {
  borrow: 'bg-borrow text-white',
  dark: 'bg-borrowDark text-white',
  gray: 'bg-gray text-borrowDark'
};

interface ButtonProps {
  label: string;
  variant: keyof typeof ButtonVariant;
  width?: string;
  onClick?: () => void;
}

export function CustomButton({ label, variant, width, onClick }: ButtonProps) {
  const properties = ButtonVariant[variant];
  const divWidth = width ? width : 'w-full';

  return (
    <Button
      className={`${properties} font-semibold font-nunito hover:opacity-80 ${divWidth}`}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
