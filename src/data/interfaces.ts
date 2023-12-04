import * as yup from 'yup';
import { schema } from './schema';
import { FormType } from './types';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export interface Store {
  data: string;
}

export interface MyInputData
  extends Optional<yup.InferType<typeof schema>, 'uploadImage'> {}

export interface MyFormData extends Omit<MyInputData, 'uploadImage'> {
  id: string;
  formType: FormType;
  imageBase64: string;
}

export interface MyResultData extends MyFormData {
  isLast: boolean;
}
