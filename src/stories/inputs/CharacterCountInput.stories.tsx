import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import CharacterCountInput, {
  CharacterCountInputProps,
} from "@ui/components/atoms/inputs/char-count-input";

export default {
  title: "Components/Inputs/CharacterCountInput",
  component: CharacterCountInput,
} as Meta;

const Template: StoryFn<CharacterCountInputProps> = (args) => {
  const [value, setValue] = useState("");

  return (
    <div style={{ width: "300px" }}>
      <CharacterCountInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export const TextInput = Template.bind({});
TextInput.args = {
  label: "Name",
  maxLength: 20,
  isTextArea: false,
};

export const TextAreaInput = Template.bind({});
TextAreaInput.args = {
  label: "Description",
  maxLength: 100,
  isTextArea: true,
};
