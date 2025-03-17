'use client';

import { WinnerCard } from 'components';


export default function Home() {
  return (
    <div className="flex flex-1 flex-col h-full justify-center items-center bg-white">
      <WinnerCard
        firstName="Arthur"
        firstImage="https://res.cloudinary.com/dzi0uoyed/image/upload/v1740185612/rdnta5kxrygsgmjwrwwa.jpg"
        secondName="Arthur2"
        secondImage="https://res.cloudinary.com/dzi0uoyed/image/upload/v1740185612/rdnta5kxrygsgmjwrwwa.jpg"
        thirdName="Arthur3"
        thirdImage="https://res.cloudinary.com/dzi0uoyed/image/upload/v1740185612/rdnta5kxrygsgmjwrwwa.jpg"
      />
    </div>
  );
}
