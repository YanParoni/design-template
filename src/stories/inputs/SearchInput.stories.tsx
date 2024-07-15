import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import SearchInput, {
  InputProps,
} from "@ui/components/atoms/inputs/search-input";

export default {
  title: "Components/Inputs/SearchInput",
  component: SearchInput,
} as Meta;

const Template: StoryFn<InputProps> = (args) => {
  const [value, setValue] = useState("");

  return (
    <div style={{ width: "300px" }}>
      <SearchInput
        {...args}
        onChange={(e) => {
          setValue(e.target.value);
          args.onChange(e);
        }}
      />
      <p>Current value: {value}</p>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  onChange: (e) => {
    console.log("Input changed:", e.target.value);
  },
  onClick: () => {
    console.log("Icon clicked");
  },
};
