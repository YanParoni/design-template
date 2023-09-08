import * as React from 'react';

interface IChatTitleProps {
  children: React.ReactNode
}

const ChatHeader = ({children}:IChatTitleProps) => {
  return (
    <div className='flex w-full absolute bg-bkg-chat max-h-20 md:grid md:grid-cols-1 justify-items border-b rounded-md shadow shadow-bkg justify-items-end py-2 border-solid border-purple-500 z-50 '>
      {children}
    </div>
  )
    ;
};

export default ChatHeader;
