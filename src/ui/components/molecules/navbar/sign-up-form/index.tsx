import React from "react";
import Input from "@ui/components/atoms/inputs/input";
import Button from "@ui/components/atoms/button";
import { useCreateUser } from "@ui/queries/user";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import signUpSchema from "@ui/validators/signup-schema";
import ErrorMessage from "@ui/components/atoms/error-message";
import { useAlertStore } from "client/store";
interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  at:string
}

interface SignUpForm{
  onClose: () => void;
}


const SignUpForm: React.FC<SignUpForm> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(signUpSchema),
    mode: "onBlur",
  });
  const createUser = useCreateUser();
  const { showAlert } = useAlertStore();

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await createUser.mutateAsync(data);
      showAlert("User created successfully!", "success");
      reset();
      onClose()
    } catch (error) {
      console.log("Error creating user", error);
      showAlert("Failed to create user", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <div className="relative mb-4 w-[240px]">
        <Input
          variant="secondary"
          {...register("email")}
          label="Email Address"
        />
        {errors?.email && (
          <ErrorMessage message={errors?.email?.message as string} />
        )}
      </div>

      <div className="relative mb-4 w-[140px]">
        <Input variant="secondary" {...register("username")} label="Username" />
        {errors.username && (
          <ErrorMessage message={errors.username.message as string} />
        )}
      </div>

      <div className="relative mb-4 w-[140px]">
        <Input variant="secondary" {...register("at")} label="@" />
        {errors.at && (
          <ErrorMessage message={errors.at.message as string} />
        )}
      </div>
      <div className="relative mb-4 w-[140px]">
        <Input
          variant="secondary"
          {...register("password")}
          label="Password"
          type="password"
        />
        {errors.password && (
          <ErrorMessage message={errors.password.message as string} />
        )}
      </div>

      <Button
        label="Sign Up"
        variant="primary"
        type="submit"
        disabled={!isValid}
      />
    </form>
  );
};

export default SignUpForm;
