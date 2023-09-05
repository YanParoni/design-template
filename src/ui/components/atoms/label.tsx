import * as React from 'react';

export interface ILabelProps {
    text: string
}

export function Label ({text}:ILabelProps ) {
  return (
    <label className="text-secondary-color cursor-pointer font-normal">{text}</label>
  );
}
