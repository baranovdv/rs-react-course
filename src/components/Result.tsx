import { FC } from 'react';
import { MyFormData } from '../data/types';
import { Button } from './ui/Button';

interface ResultProps {
  onUpdateClick: (event: React.MouseEvent<HTMLElement>) => void;
  data: MyFormData;
}

const BUTTON_TITLE = 'Update';

const Result: FC<ResultProps> = ({ onUpdateClick, data }) => {
  const { name, age, email, gender } = data;

  return (
    <div className="flex flex-col gap-1 p-6 items-center w-full rounded-[5%] bg-[rgba(255,255,255,0.3)] text-[rgba(71,71,71)]">
      {/* <img className="w-[40%] rounded-[50%] m-2" src={image} alt="image" /> */}
      <h2 className="text-2xl font-bold py">{name}</h2>
      <h3 className="font-semibold self-start">Age: {age}</h3>
      <h3 className="font-semibold self-start">E-mail: {email}</h3>
      <h3 className="font-semibold self-start">Gender: {gender}</h3>
      <Button onClick={onUpdateClick}>{BUTTON_TITLE}</Button>
    </div>
  );
};

export { Result };
