import Image from 'next/image';
import { type FC } from 'react';
import { TEST_DATA } from '../data/data';
import { type ResultData } from '../data/types';

interface DetailsProps {
  data: ResultData;
}

const Details: FC<DetailsProps> = ({ data }) => {
  const { image, name, species, gender, status, origin, location, episode } =
    data;

  return (
    <div
      data-testid={TEST_DATA.DETAILS}
      className="flex flex-col gap-2 mt-5 p-6 items-center w-full rounded-[5%] bg-[rgba(255,255,255,0.3)] text-[rgba(71,71,71)]"
    >
      <div className="relative w-[60%] aspect-square m-2">
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
      <h3 className="font-semibold self-start">Origin: {origin.name}</h3>
      <h3 className="font-semibold self-start">Location: {location.name}</h3>
      <h3 className="font-semibold self-start">Episode: {episode[0]}</h3>
    </div>
  );
};

export { Details };
