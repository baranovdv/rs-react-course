/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { ageArray, Genders, NOT_FOUND, NO_ID } from '../data/data';
import { MyFormData, MyInputData } from '../data/interfaces';
import { schema } from '../data/schema';
import { useNavigate, useParams } from 'react-router-dom';
import { addResult, selectResultsStore } from '../store/resultsSlice';
import { countriesList } from '../data/countriesList';

const REACTHOOK_TITLE = 'Reacthook';

const Reacthook: FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const id = useParams().id || NO_ID;

  const formInitData = useAppSelector(selectResultsStore).find(
    (result) => result.id === id
  );

  const [showCountrySearch, setShowCountrySearch] = useState<boolean>(false);

  const [countrySearch, setCountrySearch] = useState<string[]>(countriesList);

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

  const countryOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const filter = countriesList.filter((country) =>
      country.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setValue('country', event.target.value);
    trigger('country');
    setCountrySearch(filter.length !== 0 ? filter : [NOT_FOUND]);
  };

  const countryOnFocusHandler = () => setShowCountrySearch(true);
  const countryOnBlurHandler = () => {
    setShowCountrySearch(false);
  };
  const countryClickHandler = (country: string) => {
    setValue('country', country);
    trigger('country');
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-8 gap-4 w-full text-[rgba(71,71,71)]"
      >
        <h1 className="text-center font-bold text-3xl my-3">
          {REACTHOOK_TITLE}
        </h1>
        <div className={`flex justify-around`}>
          <label className="flex w-[30%] justify-end items-center text-2xl">
            Name*
          </label>
          <div className="relative flex flex-col w-[35%]">
            <input
              {...register('name')}
              className="w-full px-1 border-2 border-red-800"
            />
            {errors.name && (
              <p className="absolute bottom-[-0.7rem] left-0 text-red-600 text-xs">
                {errors.name.message}
              </p>
            )}
          </div>
        </div>

        <div className={`flex justify-around`}>
          <label className="flex w-[30%] justify-end items-center text-2xl">
            Password*
          </label>
          <div className="relative flex flex-col w-[35%]">
            <input
              {...register('password')}
              className="w-full px-1 border-2 border-red-800"
            />
            {errors.password && (
              <p className="absolute bottom-[-0.7rem] left-0 text-red-600 text-xs">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className={`flex justify-around`}>
          <label className="flex w-[30%] justify-end items-center text-2xl">
            Confirm Password*
          </label>
          <div className="relative flex flex-col w-[35%]">
            <input
              {...register('confirmPassword')}
              className="w-full px-1 border-2 border-red-800"
            />
            {errors.confirmPassword && (
              <p className="absolute bottom-[-0.7rem] left-0 text-red-600 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className={`flex justify-around`}>
          <label className="flex w-[30%] justify-end items-center text-2xl">
            Age*
          </label>
          <div className="relative flex flex-col w-[35%]">
            <select
              {...register('age')}
              className="px-1 border-2 border-red-800 w-fit"
            >
              <option>Select age</option>
              {ageArray.map((age) => {
                return (
                  <option key={age} value={age}>
                    {age}
                  </option>
                );
              })}
            </select>
            {errors.age && (
              <p className="absolute bottom-[-0.7rem] left-0 text-red-600 text-xs">
                {errors.age.message}
              </p>
            )}
          </div>
        </div>

        <div className={`flex justify-around`}>
          <label className="flex w-[30%] justify-end items-center text-2xl">
            E-mail*
          </label>
          <div className="relative flex flex-col w-[35%]">
            <input
              {...register('email')}
              className="w-full px-1 border-2 border-red-800"
            />
            {errors.email && (
              <p className="absolute bottom-[-0.7rem] left-0 text-red-600 text-xs">
                {errors.email?.message}
              </p>
            )}
          </div>
        </div>

        <div className={`flex justify-around`}>
          <label className="flex w-[30%] justify-end items-center text-2xl">
            Gender*
          </label>
          <div className="relative flex flex-col w-[35%]">
            <select
              {...register('gender')}
              className="px-1 border-2 border-red-800 w-fit"
            >
              <option>Choose gender</option>
              {Genders.map((gender) => {
                return (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                );
              })}
            </select>
            {errors.gender && (
              <p className="absolute bottom-[-0.7rem] left-0 text-red-600 text-xs">
                {errors.gender.message}
              </p>
            )}
          </div>
        </div>

        <div className={`flex justify-around`}>
          <label className="flex w-[30%] justify-end items-center text-2xl">
            T&C*
          </label>
          <div className="relative flex flex-col justify-center w-[35%]">
            <input
              type="checkbox"
              {...register('tandc')}
              className="w-fit px-1"
            />
            {errors.tandc && (
              <p className="absolute bottom-[-0.4rem] left-0 text-red-600 text-xs">
                {errors.tandc.message}
              </p>
            )}
          </div>
        </div>

        <div className={`flex justify-around`}>
          <label className="flex w-[30%] justify-end items-center text-2xl">
            Upload Image*
          </label>
          <div className="relative flex flex-col w-[35%]">
            <input
              type="file"
              accept="image/png, image/jpeg"
              {...register('uploadImage')}
              className="w-full"
            />
            {errors.uploadImage && (
              <p className="absolute bottom-[-0.7rem] left-0 text-red-600 text-xs">
                {errors.uploadImage.message}
              </p>
            )}
          </div>
        </div>

        <div className={`flex justify-around`}>
          <label className="flex w-[30%] justify-end items-center text-2xl">
            Find Country*
          </label>
          <div className="relative flex flex-col w-[35%]">
            <input
              {...register('country')}
              onChange={countryOnChangeHandler}
              onFocus={countryOnFocusHandler}
              onBlur={countryOnBlurHandler}
              className="w-full px-1 border-2 border-red-800"
            />
            {showCountrySearch && (
              <ul className="absolute flex flex-col gap-1 top-[1.8rem] left-0 w-full h-fit max-h-40 p-4 pt-2 overflow-scroll bg-[rgba(255,255,255,0.8)] z-10">
                {countrySearch.map((country) => {
                  if (country === NOT_FOUND)
                    return (
                      <li key={country} className="relative z-20">
                        {country}
                      </li>
                    );
                  return (
                    <li
                      onMouseDown={() => countryClickHandler(country)}
                      key={country}
                      className="relative z-20 cursor-pointer hover:underline"
                    >
                      {country}
                    </li>
                  );
                })}
              </ul>
            )}
            {errors.country && (
              <p className="absolute bottom-[-0.7rem] left-0 text-red-600 text-xs">
                {errors.country.message}
              </p>
            )}
          </div>
        </div>

        <button
          className="px-4 py-2 w-36 self-center border-2 border-red-800 bg-red-100 hover:bg-red-400 active:bg-red-900 disabled:bg-gray-100"
          type="submit"
          disabled={!isValid}
        >
          {'Submit'}
        </button>
      </form>
    </>
  );
};

export { Reacthook };
