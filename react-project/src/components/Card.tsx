import { FC } from 'react';
import { CARD_DATA } from '../data/data';
import { ResultData } from '../data/types';
import { Button } from './ui/Button';

interface CardProps {
  data: ResultData;
  onDetailsClick: () => void;
}

const Card: FC<CardProps> = ({ data, onDetailsClick }) => {
  const { image, name, species, gender, status, origin } = data;

  return (
    <div
      data-testid="card-item"
      className="flex flex-col gap-1 p-6 items-center w-[320px] rounded-[5%] bg-[rgba(255,255,255,0.3)] text-[rgba(71,71,71)]"
    >
      <img className="w-[40%] rounded-[50%] m-2" src={image} alt="image" />
      <h2 className="text-2xl font-bold py">{name}</h2>
      <h3 className="font-semibold self-start">Species: {species}</h3>
      <h3 className="font-semibold self-start">Gender: {gender}</h3>
      <h3 className="font-semibold self-start">Status: {status}</h3>
      <h3 className="font-semibold self-start pb-3">
        Origin: {origin.name.split(' ')[0]}
      </h3>
      <Button onClick={onDetailsClick}>{CARD_DATA.buttonLabel}</Button>
    </div>
  );
};

export { Card };
