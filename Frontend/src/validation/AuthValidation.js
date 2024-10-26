import * as Yup from 'yup';

// Login Validation
export const loginValidationSchema = Yup.object({
  email: Yup.string()
  .email('Please enter a valid email address (e.g. example@example.com)')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

// forgot Password Validation
export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
  .email('Please enter a valid email address (e.g. example@example.com)')
    .required('Email is required')
});
// register validation
export const registerValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First Name is too short!')
    .max(50, 'First Name is too long!')
    .required('First Name is required'),
  
  lastName: Yup.string()
    .min(2, 'Last Name is too short!')
    .max(50, 'Last Name is too long!')
    .required('Last Name is required'),
  
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number is not valid')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number can be up to 15 digits')
    .required('Phone number is required'),

  country: Yup.string()
    .required('Country is required'),

  state: Yup.string()
    .required('State is required'),

  city: Yup.string()
    .required('City is required'),

  hospital: Yup.string()
    .required('Please select a hospital'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
// Otp Validation
export const otpValidationSchema = Yup.object().shape({
  otp: Yup.array()
    .of(
      Yup.string()
        .length(1, "Each OTP field must be 1 digit")
        .required("This field is required")
    )
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits"),
});

// Validation schema using Yup
export const resetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});