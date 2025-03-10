'use client';

import { PaginationComponent, GroupCover, SelectInput } from "components";
import { GroupCoverImage } from "assets";


export default function Home() {
  return (
    <div className="flex flex-1 flex-col h-full justify-center items-center bg-black">
      <h1 className="text-white text-4xl font-bold">bookworms.</h1>
      <PaginationComponent />
      <GroupCover name="Book Club" date="Every Sunday" type="Book Club" image={GroupCoverImage} />
      <SelectInput placeholder="Select an option" options={["Option 1", "Option 2", "Option 3"]} />
    </div>
  );
}
