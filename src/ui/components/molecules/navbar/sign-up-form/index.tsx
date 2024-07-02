import React from 'react';
import Input from '@ui/components/atoms/input';
import Button from '@ui/components/atoms/button';

const SignUpForm: React.FC = () => {
  return (
    <>
      <form>
        <div className="mb-4 w-[240px]">
          <Input
            variant="secondary"
            onChange={() => {}}
            label="Email Address"
          />
        </div>
        <div className="mb-4 w-[140px]">
          <Input
            variant="secondary"
            onChange={() => {}}
            label="Username"
          />
        </div>
        <div className="mb-4 w-[140px]">
          <Input
            variant="secondary"
            onChange={() => {}}
            label="Password"
            type="password"
          />
        </div>
        <Button
          label="Sign Up"
          variant="primary"
          onClick={() => {}}
        />
      </form>
    </>
  );
};

export default SignUpForm;
