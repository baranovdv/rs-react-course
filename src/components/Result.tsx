import { FC, useEffect, useState } from 'react';
import { MyResultData } from '../data/interfaces';

interface ResultProps {
  title: string;
  data: MyResultData;
}

const NEW_RESULT_BGCOLOR = 'bg-green-300';

const Result: FC<ResultProps> = ({ title, data }) => {
  const {
    name,
    password,
    age,
    email,
    gender,
    tandc,
    country,
    imageBase64,
    isLast,
  } = data;
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    let timeoutID: number | null = null;
    if (isLast) {
      setBgColor(NEW_RESULT_BGCOLOR);
      timeoutID = setTimeout(() => {
        setBgColor('');
      }, 1000);
    }
    return () => {
      if (timeoutID) clearTimeout(timeoutID);
    };
  }, [isLast]);

  return (
    <div
      className={`flex flex-col gap-1 p-6 items-center w-full rounded-[5%] bg-[rgba(255,255,255,0.3)] text-[rgba(71,71,71)] transition-all; ${bgColor}`}
    >
      <h2 className="text-2xl font-bold py-1">
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </h2>
      <img
        className="w-[40%] rounded-[50%] m-2"
        src={imageBase64}
        alt="image"
      />
      <h3 className="font-semibold self-start">Name: {name}</h3>
      <h3 className="font-semibold self-start">Password: {password}</h3>
      <h3 className="font-semibold self-start">Age: {age}</h3>
      <h3 className="font-semibold self-start">E-mail: {email}</h3>
      <h3 className="font-semibold self-start">Gender: {gender}</h3>
      <h3 className="font-semibold self-start">
        T & C: {tandc ? 'OK' : 'FAIL'}
      </h3>
      <h3 className="font-semibold self-start">Country: {country}</h3>
    </div>
  );
};

export { Result };
