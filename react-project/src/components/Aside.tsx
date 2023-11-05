import { useEffect, useRef, useState } from 'react';
import { fetchDetails } from '../API/fetchRandM';
import { ResultData } from '../data/types';
import Details from './Details';
import Spinner from './misc/Spinner';
import { Button } from './ui/Button';

interface AsideProps {
  onClose: () => void;
  id: number;
}

export default function ({ onClose, id }: AsideProps) {
  const [isLoading, setIsLoading] = useState(true);
  const content = useRef<ResultData | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchDetails({ id }).then((data: ResultData) => {
      content.current = data;
      setIsLoading(false);
    });
  }, [id]);

  return (
    <>
      <div
        onClick={onClose}
        className="fixed bg-black/20 top-0 right-0 left-0 bottom-0 z-10"
      ></div>

      <aside className="w-[320px] h-full fixed top-0 right-0 py-10 px-5 bg-white/95 z-20 lg:w-[30%]">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          content.current && <Details data={content.current}></Details>
        )}
      </aside>
      <div className="fixed top-5 right-5 z-20">
        <Button onClick={onClose}>X</Button>
      </div>
    </>
  );
}
