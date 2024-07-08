import React from "react";
import Input from "@ui/components/atoms/input";
import Button from "@ui/components/atoms/button";
import { useCreateUser } from "@ui/queries/user";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import signUpSchema from "@ui/validators/signup-schema";
import ErrorMessage from "@ui/components/atoms/error-message";

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<SignUpFormValues>({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
  });
  const createUser = useCreateUser();

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await createUser.mutateAsync(data);
      alert("User created successfully!");
      reset();
    } catch (error) {
      console.error("Error creating user", error);
      alert("Failed to create user");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <div className="mb-4 w-[240px] relative">
        <Input
          variant="secondary"
          {...register("email")}
          label="Email Address"
        />
        {errors?.email && <ErrorMessage message={errors?.email?.message as string} />}
      </div>
      
      <div className="mb-4 w-[140px] relative">
        <Input
          variant="secondary"
          {...register("username")}
          label="Username"
        />
        {errors.username && <ErrorMessage message={errors.username.message as string} />}
      </div>
      
      <div className="mb-4 w-[140px] relative">
        <Input
          variant="secondary"
          {...register("password")}
          label="Password"
          type="password"
        />
        {errors.password && <ErrorMessage message={errors.password.message as string} />}
      </div>
      
      <Button label="Sign Up" variant="primary" type="submit" disabled={!isValid} />
    </form>
  );
};

export default SignUpForm;
