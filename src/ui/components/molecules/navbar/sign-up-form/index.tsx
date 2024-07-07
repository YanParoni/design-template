import React, { useState } from "react";
import Input from "@ui/components/atoms/input";
import Button from "@ui/components/atoms/button";
import { useCreateUser } from "@ui/queries/user";

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const createUser = useCreateUser();

  const handleSubmit = async () => {
    try {
      await createUser.mutateAsync({
        username,
        email,
        password,
      });
      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user", error);
      alert("Failed to create user");
    }
  };


  return (
    <>
      <form>
        <div className="mb-4 w-[240px]">
          <Input
            variant="secondary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
          />
        </div>
        <div className="mb-4 w-[140px]">
          <Input 
          value={username}
          variant="secondary"
          onChange={(e) => setUsername(e.target.value)}
          label="Username" />
        </div>
        <div className="mb-4 w-[140px]">
          <Input
            value={password}
            variant="secondary"
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
          />
        </div>
        <Button label="Sign Up" variant="primary" onClick={handleSubmit} />
      </form>
    </>
  );
};

export default SignUpForm;
