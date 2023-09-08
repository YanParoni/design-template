import * as React from 'react';

export interface ILabelProps {
    text: string
}

export function Label ({text}:ILabelProps ) {
  return (
    <label className="text-secondary-color text-lg cursor-pointer font-bold">{text}</label>
  );
}
