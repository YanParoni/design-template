import * as yup from "yup";

export const profileFormSchema = yup.object().shape({
  at: yup
    .string()
    .required("@ is required")
    .max(14, "@ must be at most 14 characters")
    .matches(/^\S*$/, "@ cannot contain spaces"),
  bio: yup.string().max(120, "Bio must be at most 120 characters"),
});
