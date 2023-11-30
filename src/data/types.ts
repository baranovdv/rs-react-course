export type GenderType = 'Male' | 'Female' | 'Unknown';

export type MyFormData = {
  name: string;
  age: number;
  email: string;
  gender: GenderType;
  img?: null;
  country?: null;
};
