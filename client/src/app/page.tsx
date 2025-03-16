'use client';

import {
  PaginationComponent,
  GroupCover,
  SelectInput,
  PostCard,
  FileUpload
} from 'components';
import { GroupCoverImage, UserPostImage } from 'assets';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col h-full justify-center items-center bg-brown">
      <h1 className="text-white text-4xl font-bold">bookworms.</h1>
      {/* <PaginationComponent />
      <GroupCover
        name="Book Club"
        date="Every Sunday"
        type="Book Club"
        image={GroupCoverImage}
      />
      <SelectInput
        placeholder="Select an option"
        options={['Option 1', 'Option 2', 'Option 3']}
      /> */}
      {/* <PostCard
        postText="Sabrina eh mt bommmmmmm"
        author="Author"
        date="11 de dez., 09h45"
        image={UserPostImage}
      /> */}
      <FileUpload
        onFileSelect={console.log}
        width={870}
        height={337}
        label="Foto de Grupo"
      />
    </div>
  );
}
