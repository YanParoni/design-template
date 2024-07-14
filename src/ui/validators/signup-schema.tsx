import * as yup from "yup";

const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  username: yup
    .string()
    .required("Username is required")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    )
    .min(3, "Username must be at least 3 characters")
    .max(14, "Username cannot be longer than 14 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password cannot be longer than 32 characters"),
});

export default signUpSchema;
