import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Input, { InputProps } from '@ui/components/atoms/inputs/input';

export default {
  title: 'Components/Inputs/Input',
  component: Input,
} as Meta;

const Template: StoryFn<InputProps> = (args) => {
  const [value, setValue] = useState('');

  return (
    <div style={{ width: '300px' }}>
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export const PrimaryTextInput = Template.bind({});
PrimaryTextInput.args = {
  label: 'Primary Input',
  variant: 'primary',
  type: 'text',
};

export const SecondaryTextInput = Template.bind({});
SecondaryTextInput.args = {
  label: 'Secondary Input',
  variant: 'secondary',
  type: 'text',
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  label: 'Password',
  variant: 'primary',
  type: 'password',
  forgottenLabel: true,
};

export const SecondaryPasswordInput = Template.bind({});
SecondaryPasswordInput.args = {
  label: 'Password',
  variant: 'secondary',
  type: 'password',
  forgottenLabel: true,
};
