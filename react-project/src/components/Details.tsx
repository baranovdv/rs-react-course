import { ResultData } from '../data/types';

interface DetailsProps {
  data: ResultData;
}

export default function ({ data }: DetailsProps) {
  return (
    <div className="flex flex-col gap-2 mt-5 p-6 items-center w-full rounded-[5%] bg-[rgba(255,255,255,0.3)] text-[rgba(71,71,71)]">
      <img className="w-[60%] rounded-[50%] m-2" src={data.image} alt="image" />
      <h2 className="text-2xl font-bold py">{data.name}</h2>
      <h3 className="font-semibold self-start">Species: {data.species}</h3>
      <h3 className="font-semibold self-start">Gender: {data.gender}</h3>
      <h3 className="font-semibold self-start">Status: {data.status}</h3>
      <h3 className="font-semibold self-start">Origin: {data.origin.name}</h3>
      <h3 className="font-semibold self-start">
        Location: {data.location.name}
      </h3>
      <h3 className="font-semibold self-start">Episode: {data.episode[0]}</h3>
    </div>
  );
}
