/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ageArray,
  Genders,
  LABELS,
  NO_ID,
  SUBMIT_BUTTON_TITLE,
} from '../data/data';
import { MyFormData, MyInputData } from '../data/interfaces';
import { schema } from '../data/schema';
import { useNavigate, useParams } from 'react-router-dom';
import { addResult, selectResultsStore } from '../store/resultsSlice';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Checkbox } from '../components/ui/Checkbox';
import { UploadImage } from '../components/ui/UploadImage';
import { AutocompleteR } from '../components/ui/reacthook/AutocompleteR';
import { selectCountriesStore } from '../store/countriesSlice';
import { Button } from '../components/ui/Button';
import { PasswordR } from '../components/ui/reacthook/PasswordR';

const REACTHOOK_TITLE = 'Reacthook';

const Reacthook: FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const id = useParams().id || NO_ID;

  const formInitData = useAppSelector(selectResultsStore).find(
    (result) => result.id === id
  );

  const countriesInitData = useAppSelector(selectCountriesStore);

  const {
    setValue,
    register,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<MyInputData>({
    mode: 'all',
    resolver: yupResolver<MyInputData>(schema),
  });

  useEffect(() => {
    if (formInitData) {
      setValue('name', formInitData.name);
      setValue('age', formInitData.age);
      setValue('email', formInitData.email);
      setValue('gender', formInitData.gender);
      setValue('password', formInitData.password);
      setValue('confirmPassword', formInitData.password);
      setValue('tandc', formInitData.tandc);
      setValue('country', formInitData.country);
      trigger();
    }
  }, []);

  const onSubmit = (data: MyInputData) => {
    if (data.uploadImage === undefined) return;

    const uploadedImage = data.uploadImage[0];
    const reader = new FileReader();

    delete data.uploadImage;

    const submitResult = () => {
      const imageBase64 = reader.result;

      const resultData: MyFormData = {
        ...data,
        formType: 'reacthook',
        id: id,
        imageBase64: imageBase64 as string,
      };
      dispatch(addResult(resultData));
      navigate('/');
      reader.removeEventListener('load', submitResult);
    };

    reader.addEventListener('load', submitResult);

    reader.readAsDataURL(uploadedImage);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-8 gap-4 w-full text-[rgba(71,71,71)]"
    >
      <h1 className="text-center font-bold text-3xl my-3">{REACTHOOK_TITLE}</h1>

      <Input error={errors.name?.message} {...register('name')}>
        {LABELS.name}
      </Input>

      <PasswordR error={errors.password?.message} {...register('password')}>
        {LABELS.password}
      </PasswordR>

      <Input
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      >
        {LABELS.confirmPassword}
      </Input>

      <Select error={errors.age?.message} array={ageArray} {...register('age')}>
        {LABELS.age}
      </Select>

      <Input error={errors.email?.message} {...register('email')}>
        {LABELS.email}
      </Input>

      <Select
        error={errors.gender?.message}
        array={Genders}
        {...register('gender')}
      >
        {LABELS.gender}
      </Select>

      <Checkbox error={errors.tandc?.message} {...register('tandc')}>
        {LABELS.tandc}
      </Checkbox>

      <UploadImage
        error={errors.uploadImage?.message}
        {...register('uploadImage')}
      >
        {LABELS.uploadImage}
      </UploadImage>

      <AutocompleteR
        error={errors.country?.message}
        initArray={countriesInitData}
        setValue={setValue}
        trigger={trigger}
        {...register('country')}
      >
        {LABELS.country}
      </AutocompleteR>

      <Button type="submit" disabled={!isValid} className="w-36 self-center">
        {SUBMIT_BUTTON_TITLE}
      </Button>
    </form>
  );
};

export { Reacthook };
