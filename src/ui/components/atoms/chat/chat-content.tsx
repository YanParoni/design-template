import * as React from 'react';

interface ChatContent{
    children: React.ReactNode
}

const ChatContent= ({children}: ChatContent) => {
  return <div className='flex-grow flex-row md:flex-col p-6  max-h-80  h-80 w-72 '>
    {children}
  </div>;
};

export default ChatContent;
