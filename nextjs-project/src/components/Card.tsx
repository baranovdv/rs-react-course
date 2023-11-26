import Image from 'next/image';
import { type FC } from 'react';
import { CARD_DATA, TEST_DATA } from '../data/data';
import { type ResultData } from '../data/types';
import { Button } from './ui/Button';

interface CardProps {
  data: ResultData;
  onDetailsClick: () => void;
}

const Card: FC<CardProps> = ({ data, onDetailsClick }) => {
  const { image, name, species, gender, status, origin } = data;

  return (
    <div
      data-testid={TEST_DATA.CARD}
      className="flex flex-col gap-1 p-6 items-center w-[320px] rounded-[5%] bg-[rgba(255,255,255,0.3)] text-[rgba(71,71,71)]"
    >
      <div className="relative w-[40%] aspect-square m-2">
        <Image
          src={image}
          loader={() => image}
          fill
          alt="image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className="rounded-full"
          unoptimized
        />
      </div>

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
