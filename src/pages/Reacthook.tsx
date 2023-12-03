/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { ageArray, Genders, LABELS, NO_ID } from '../data/data';
import { MyFormData, MyInputData } from '../data/interfaces';
import { schema } from '../data/schema';
import { useNavigate, useParams } from 'react-router-dom';
import { addResult, selectResultsStore } from '../store/resultsSlice';
import { countriesList } from '../data/countriesList';
import { Input } from '../components/ui/reacthook/Input';
import { Select } from '../components/ui/reacthook/Select';
import { Checkbox } from '../components/ui/reacthook/Checkbox';
import { UploadImage } from '../components/ui/reacthook/UploadImage';
import { Autocomplete } from '../components/ui/reacthook/Autocomplete';

const REACTHOOK_TITLE = 'Reacthook';

const Reacthook: FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const id = useParams().id || NO_ID;

  const formInitData = useAppSelector(selectResultsStore).find(
    (result) => result.id === id
  );

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

      <Input errors={errors.name} {...register('name')}>
        {LABELS.name}
      </Input>

      <Input errors={errors.password} {...register('password')}>
        {LABELS.password}
      </Input>

      <Input errors={errors.confirmPassword} {...register('confirmPassword')}>
        {LABELS.confirmPassword}
      </Input>

      <Select errors={errors.age} array={ageArray} {...register('age')}>
        {LABELS.age}
      </Select>

      <Input errors={errors.email} {...register('email')}>
        {LABELS.email}
      </Input>

      <Select errors={errors.gender} array={Genders} {...register('gender')}>
        {LABELS.gender}
      </Select>

      <Checkbox errors={errors.tandc} {...register('tandc')}>
        {LABELS.tandc}
      </Checkbox>

      <UploadImage errors={errors.uploadImage} {...register('uploadImage')}>
        {LABELS.uploadImage}
      </UploadImage>

      <Autocomplete
        errors={errors.country}
        initArray={countriesList}
        setValue={setValue}
        trigger={trigger}
        {...register('country')}
      >
        {LABELS.country}
      </Autocomplete>

      <button
        className="px-4 py-2 w-36 self-center border-2 border-red-800 bg-red-100 hover:bg-red-400 active:bg-red-900 disabled:bg-gray-100"
        type="submit"
        disabled={!isValid}
      >
        {'Submit'}
      </button>
    </form>
  );
};

export { Reacthook };
