import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { fetchDetails } from '../API/fetchRandM';
import { ResultData } from '../data/types';
import { Details } from './Details';
import { Spinner } from './misc/Spinner';
import { Button } from './ui/Button';

const Aside = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const content = useRef<ResultData | null>(null);

  const id: number = Number(useParams().id) || 0;

  useEffect(() => {
    async function fetchData(id: number): Promise<void> {
      const data: ResultData = await fetchDetails({ id });

      content.current = data;

      setIsLoading(false);
    }

    setIsLoading(true);

    fetchData(id).catch((error: Error) => {
      throw new Error(error.message);
    });
  }, [id]);

  const handleAsideClose = () => {
    navigate(-1);
  };

  return (
    <>
      <div
        onClick={handleAsideClose}
        className="fixed bg-black/20 top-0 right-0 left-0 bottom-0 z-10"
      ></div>

      <aside className="w-[320px] h-full fixed top-0 right-0 py-10 px-5 bg-white/95 z-20 lg:w-[30%]">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          content.current && <Details data={content.current} />
        )}
      </aside>
      <div className="fixed top-5 right-5 z-20">
        <Button onClick={handleAsideClose} testId="aside-button-close">
          X
        </Button>
      </div>
    </>
  );
};

export { Aside };
