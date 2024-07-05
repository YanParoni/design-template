import * as React from "react";

interface IChatTitle {
  title: string;
}

export function ChatTitle({ title }: IChatTitle) {
  return (
    <div className="flex w-full">
      <h3 className="mx-16 text-center text-2xl font-normal text-primary-color md:text-lg">
        {title}
      </h3>
    </div>
  );
}
