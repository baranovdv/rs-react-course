/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  ageArray,
  Genders,
  LABELS,
  NO_ID,
  SUBMIT_BUTTON_TITLE,
} from '../data/data';
import { MyFormData, MyInputData } from '../data/interfaces';
import { useNavigate, useParams } from 'react-router-dom';
import { addResult, selectResultsStore } from '../store/resultsSlice';
import { ValidationError } from 'yup';
import { schema } from '../data/schema';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Checkbox } from '../components/ui/Checkbox';
import { UploadImage } from '../components/ui/UploadImage';
import { AutocompleteU } from '../components/ui/uncontrolled/AutocompleteU';
import { selectCountriesStore } from '../store/countriesSlice';
import { Button } from '../components/ui/Button';

const UNCONTROLLED_TITLE = 'Uncontrolled';

const Uncontrolled: FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const id = useParams().id || NO_ID;

  const formInitData = useAppSelector(selectResultsStore).find(
    (result) => result.id === id
  );

  const countriesInitData = useAppSelector(selectCountriesStore);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLSelectElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const genderInputRef = useRef<HTMLSelectElement>(null);
  const tandcInputRef = useRef<HTMLInputElement>(null);
  const uploadImageInputRef = useRef<HTMLInputElement>(null);
  const countryInputRef = useRef<HTMLInputElement>(null);

  const [inputErrors, setinputErrors] = useState<
    Partial<Record<keyof MyInputData, string>>
  >({});

  useEffect(() => {
    if (formInitData) {
      // setValue('name', formInitData.name);
      // setValue('age', formInitData.age);
      // setValue('email', formInitData.email);
      // setValue('gender', formInitData.gender);
    }
  }, []);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await schema
      .validate(
        {
          name: nameInputRef.current?.value,
          password: passwordInputRef.current?.value,
          confirmPassword: confirmPasswordInputRef.current?.value,
          age: ageInputRef.current?.value,
          email: emailInputRef.current?.value,
          gender: genderInputRef.current?.value,
          tandc: tandcInputRef.current?.checked,
          uploadImage: uploadImageInputRef.current?.files,
          country: countryInputRef.current?.value,
        },
        {
          abortEarly: false,
        }
      )
      .then(() => {
        if (!uploadImageInputRef.current?.files) return;

        const uploadedImage = uploadImageInputRef.current?.files[0];
        const reader = new FileReader();

        const submitResult = () => {
          const imageBase64 = reader.result;

          const resultData: MyFormData = {
            name: nameInputRef.current?.value || '',
            password: passwordInputRef.current?.value || '',
            confirmPassword: confirmPasswordInputRef.current?.value || '',
            age: Number(ageInputRef.current?.value) ?? 0,
            email: emailInputRef.current?.value || '',
            gender: genderInputRef.current?.value as
              | 'Unknown'
              | 'Male'
              | 'Female',
            tandc: tandcInputRef.current?.checked || false,
            country: countryInputRef.current?.value || '',

            formType: 'uncontrolled',
            id: id,
            imageBase64: imageBase64 as string,
          };
          dispatch(addResult(resultData));
          navigate('/');
          reader.removeEventListener('load', submitResult);
        };

        reader.addEventListener('load', submitResult);

        reader.readAsDataURL(uploadedImage);
      })
      .catch((errors: ValidationError) => {
        const newErrors: Partial<Record<keyof MyInputData, string>> = {};

        errors.inner.forEach((err) => {
          if (!err.path) return;
          newErrors[err.path as keyof MyInputData] = err.message;
        });

        setinputErrors(newErrors);
      });
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col p-8 gap-5 w-full text-[rgba(71,71,71)]"
    >
      <h1 className="text-center font-bold text-3xl my-3">
        {UNCONTROLLED_TITLE}
      </h1>

      <Input ref={nameInputRef} error={inputErrors?.name ?? ''} name="Name:">
        {LABELS.name}
      </Input>

      <Input ref={passwordInputRef} error={inputErrors?.password ?? ''}>
        {LABELS.password}
      </Input>

      <Input
        ref={confirmPasswordInputRef}
        error={inputErrors?.confirmPassword ?? ''}
      >
        {LABELS.confirmPassword}
      </Input>

      <Select ref={ageInputRef} error={inputErrors?.age ?? ''} array={ageArray}>
        {LABELS.age}
      </Select>

      <Input ref={emailInputRef} error={inputErrors?.email ?? ''}>
        {LABELS.email}
      </Input>

      <Select
        ref={genderInputRef}
        error={inputErrors?.gender ?? ''}
        array={Genders}
      >
        {LABELS.gender}
      </Select>

      <Checkbox ref={tandcInputRef} error={inputErrors?.tandc ?? ''}>
        {LABELS.tandc}
      </Checkbox>

      <UploadImage
        ref={uploadImageInputRef}
        error={inputErrors?.uploadImage ?? ''}
      >
        {LABELS.uploadImage}
      </UploadImage>

      <AutocompleteU
        ref={countryInputRef}
        error={inputErrors?.country ?? ''}
        initArray={countriesInitData}
      >
        {LABELS.country}
      </AutocompleteU>

      <Button type="submit" className="w-36 self-center">
        {SUBMIT_BUTTON_TITLE}
      </Button>
    </form>
  );
};

export { Uncontrolled };
