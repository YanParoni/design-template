import * as React from 'react';

export interface ISubheadingProps {
    text: string
}

export function Subheading({ text }: ISubheadingProps) {
    return (
        <h3 className="text-primary-color cursor-pointer text-sm font-semibold">{text}</h3>
    );
}
