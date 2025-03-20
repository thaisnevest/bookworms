'use client';

import * as React from 'react';
import Login from './Login/page';
import { Calendar } from 'components/ui/calendar';
import { WinnerCard } from 'components';


export default function Home() {
  return (
    <div className="flex flex-1 flex-col h-full justify-center items-center bg-white">
      <WinnerCard
        firstName='Arthur'
        firstImage='https://res.cloudinary.com/dzi0uoyed/image/upload/v1740185520/n2qcfl0w7cvy6aig1sw8.jpg'
        secondName='Thais'
        secondImage='https://res.cloudinary.com/dzi0uoyed/image/upload/v1740185520/n2qcfl0w7cvy6aig1sw8.jpg'
        thirdName='Ana'
        thirdImage='https://res.cloudinary.com/dzi0uoyed/image/upload/v1740185520/n2qcfl0w7cvy6aig1sw8.jpg'
      />
    </div>
  );
}
