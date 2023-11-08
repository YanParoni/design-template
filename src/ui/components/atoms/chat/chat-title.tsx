import * as React from 'react';

interface IChatTitle {
  title: string
}

export function ChatTitle({ title }: IChatTitle) {
  return (
    <div className='flex w-full'>
      <h3 className="mx-16  text-primary-color text-center font-normal text-2xl md:text-lg">
        {title}
      </h3>
    </div>
  );
}
