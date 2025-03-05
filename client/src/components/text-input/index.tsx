import { Input } from 'components/ui/input';

interface TextInputProps {
  label: string;
  type: string;
  placeholder?: string;
  width?: string;
  value?: string | number | readonly string[] | undefined;
}

export function TextInput({
  label,
  type,
  placeholder,
  width,
  value
}: TextInputProps) {
  const divWidth = width ? width : 'w-full';
  return (
    <div className={`flex-col ${divWidth}`}>
      <h2 className="text-borrow font-semibold font-nunito">{label}</h2>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        className="focus-visible:ring-neutral-400 font-nunito text-borrowDark border-gray"
      />
    </div>
  );
}
