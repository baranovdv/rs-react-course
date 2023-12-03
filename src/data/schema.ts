import * as yup from 'yup';
import { countriesList } from './countriesList';
import { ALLOWED_IMAGE_TYPE, Genders, MAX_FILE_SIZE } from './data';

const isValidImageType = (fileName: File) => {
  if (!fileName) return false;
  const fileNameArray = fileName.name.toLowerCase().split('.');
  return (
    fileNameArray.length > 0 &&
    ALLOWED_IMAGE_TYPE.includes(fileNameArray[fileNameArray.length - 1])
  );
};

const isRealCountry = (country: string | undefined) => {
  if (!country) return false;
  return countriesList.includes(country);
};

export const schema = yup.object().shape({
  name: yup.string().required('Name is a required field'),
  age: yup
    .number()
    .positive()
    .integer('Age must be Number')
    .required('Age is a required field'),
  email: yup
    .string()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'E-mail format is not correct')
    .required('E-mail is a required field'),
  gender: yup
    .string()
    .oneOf([...Genders] as const)
    .required('Gender is a required field'),
  password: yup
    .string()
    .required('Please enter a password')
    // .min(8, 'Password must have at least 8 characters')
    .matches(/[0-9]/, 'Password must have at least 1 digit')
    .matches(/[a-z]/, 'Password must have at least 1 lowercase letter')
    .matches(/[A-Z]/, 'Password must have at least 1 uppercase letter')
    .matches(
      /[!@#\$%\^\&*\)\(+=._-]/,
      'Password must have at least 1 special letter'
    ),
  confirmPassword: yup
    .string()
    .required('Please re-type your password')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
  tandc: yup
    .bool()
    .required()
    .oneOf([true], 'You must accept the terms and conditions'),
  uploadImage: yup
    .mixed<FileList>()
    .required('Please choose image file')
    .test('isTypeValid', 'Only .png and .jpeg allowed', (value) =>
      isValidImageType(value[0])
    )
    .test(
      'isSizeValid',
      'Max size is 500KB',
      (value) => value[0] && value[0].size <= MAX_FILE_SIZE
    ),
  country: yup
    .string()
    .test('isRealCountry', 'No such country', (value) => isRealCountry(value))
    .required('Country is required'),
});
