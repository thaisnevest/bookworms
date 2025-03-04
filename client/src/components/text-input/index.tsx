import { Input } from 'components/ui/input';

interface TextInputProps {
  label: string;
  type: string;
  placeholder?: string;
  width?: string;
}

export function TextInput({ label, type, placeholder, width }: TextInputProps) {
  const divWidth = width ? width : 'w-full';
  return (
    <div className={`flex-col ${divWidth}`}>
      <h2 className="text-borrow font-semibold font-nunito">{label}</h2>
      <Input
        type={type}
        placeholder={placeholder}
        className="focus-visible:ring-neutral-400 font-nunito border-gray"
      />
    </div>
  );
}
