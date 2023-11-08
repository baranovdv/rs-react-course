import { FC } from 'react';
import { ResultData } from '../data/types';

interface DetailsProps {
  data: ResultData;
}

const Details: FC<DetailsProps> = ({ data }) => {
  const { image, name, species, gender, status, origin, location, episode } =
    data;

  return (
    <div className="flex flex-col gap-2 mt-5 p-6 items-center w-full rounded-[5%] bg-[rgba(255,255,255,0.3)] text-[rgba(71,71,71)]">
      <img className="w-[60%] rounded-[50%] m-2" src={image} alt="image" />
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
