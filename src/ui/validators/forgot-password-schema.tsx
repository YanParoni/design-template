import * as yup from 'yup';

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email address").required("Email is required")
});

export default forgotPasswordSchema;
