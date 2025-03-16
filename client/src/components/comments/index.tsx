interface CommentInputProps {
  type?: string;
  placeholder?: string;
  width?: string;
  value?: string | number | readonly string[] | undefined;
}

export function CommentInput({
  placeholder = "Adicione um comentário...",
  width,
  value
}: CommentInputProps) {
  return (
    <div className={`flex-col ${width}`}>
      <h2 className="text-borrow font-semibold font-nunito"></h2>
      <div className="flex items-start">
        <textarea
        placeholder={placeholder}
        value={value}
        className="w-[351px] focus-visible:ring-neutral-400 font-nunito text-borrowDark border-none bg-gray rounded-[20px] p-2 resize-none overflow-y-auto text-[14px]"
        />
      </div>
    </div>
  );
}
