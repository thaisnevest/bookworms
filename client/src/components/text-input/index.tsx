import { Input } from 'components/ui/input';

interface TextInputProps {
  label: string;
  type: string;
  placeholder?: string;
  width?: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
}

export function TextInput({
  label,
  type,
  placeholder,
  width,
  value,
  onChange,
  error,
  errorMessage
}: TextInputProps) {
  const divWidth = width ? width : 'w-full';
  return (
    <div className={`flex-col ${divWidth}`}>
      <h2 className="text-borrow font-semibold font-nunito">{label}</h2>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`focus-visible:ring-neutral-400 font-nunito text-borrowDark ${error ? 'border-red-500' : 'border-gray'}`}
      />
      {error && (
        <p className="text-red-500 font-nunito font-semibold text-sm">
          *{errorMessage}
        </p>
      )}
    </div>
  );
}
