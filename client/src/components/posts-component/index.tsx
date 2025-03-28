import Image from 'next/image';


export interface PostCardProps {
  postText: string;
  author: string;
  date: string;
  image?: string;
}

export function PostCard({ postText, author, date, image }: PostCardProps) {
  return (
    <div className="flex flex-col w-[351px] bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center space-evenly ml-5">
        <div className="relative w-[80px] h-[200px]">
          <Image
            src={image || '/default-avatar.png'}
            alt="group-cover"
            objectFit="cover"
            width={50}
            height={51}
            className="w-[50px] h-[51px] rounded-full"
          />
        </div>
        <div className="flex flex-col mb-[150px]">
          <h2 className="text-[#49423C] font-nunito font-bold text-[16px]">
            {postText}
          </h2>
          <p className="text-[#484848] font-nunito font-light text-[14px]">
            by {author}
          </p>
        </div>
      </div>
      <div className="pr-2">
        <p className="text-[#484848] font-nunito font-light text-[14px] text-right">
          {date}
        </p>
      </div>
    </div>
  );
}
