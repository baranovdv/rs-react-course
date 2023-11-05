import { CARD_DATA } from '../data/data';
import { ResultData } from '../data/types';
import { Button } from './ui/Button';

interface CardProps {
  data: ResultData;
  onClickHandler: () => void;
}

export default function ({ data, onClickHandler }: CardProps) {
  return (
    <div className="flex flex-col gap-1 p-6 items-center w-[320px] rounded-[5%] bg-[rgba(255,255,255,0.3)] text-[rgba(71,71,71)]">
      <img className="w-[40%] rounded-[50%] m-2" src={data.image} alt="image" />
      <h2 className="text-2xl font-bold py">{data.name}</h2>
      <h3 className="font-semibold self-start">Species: {data.species}</h3>
      <h3 className="font-semibold self-start">Gender: {data.gender}</h3>
      <h3 className="font-semibold self-start">Status: {data.status}</h3>
      <h3 className="font-semibold self-start pb-3">
        Origin: {data.origin.name.split(' ')[0]}
      </h3>
      <Button onClick={onClickHandler}>{CARD_DATA.buttonLabel}</Button>
    </div>
  );
}
