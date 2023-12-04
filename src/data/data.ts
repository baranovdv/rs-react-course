export const Genders = ['Unknown', 'Male', 'Female'] as const;

export const ageArray = [...Array(88).keys()].map((age) => age + 12);

export const ROUTES = {
  uncontrolled: '/uncontrolled',
  reacthook: '/reacthook',
};

export const QUERIES = {
  id: 'id',
};

export const ALLOWED_IMAGE_TYPE = ['png', 'jpeg'];

export const MAX_FILE_SIZE = 502400;

export const NOT_FOUND = 'Not found';

export const NO_ID = 'No ID';

export const SUBMIT_BUTTON_TITLE = 'Submit';

export const LABELS = {
  name: 'Name:',
  password: 'Password:',
  confirmPassword: 'Confirm Password:',
  age: 'Age:',
  email: 'E-mail:',
  gender: 'Gender:',
  tandc: 'T & C:',
  uploadImage: 'Upload Image',
  country: 'Choose Country',
};
