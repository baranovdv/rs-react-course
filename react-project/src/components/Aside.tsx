import { useNavigate, useParams } from 'react-router';
import { TEST_DATA } from '../data/data';
import { Details } from './Details';
import { Spinner } from './misc/Spinner';
import { Button } from './ui/Button';
import { useGetCardByIdQuery } from '../API/rickAndMortyAPI';
import { ErrorResponse } from 'src/data/types';

const Aside = () => {
  const navigate = useNavigate();

  const id = useParams().id || '0';

  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetCardByIdQuery(id);

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
        {isLoading || isFetching ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          isSuccess && data && <Details data={data} />
        )}
        {isError && (
          <div className="m-10">
            Error:
            {` ${(error as ErrorResponse).status || 0}  ${
              (error as ErrorResponse).data.error || ''
            }`}
          </div>
        )}
      </aside>
      <div className="fixed top-5 right-5 z-20">
        <Button
          onClick={handleAsideClose}
          testId={TEST_DATA.ASIDE_BUTTON_CLOSE}
        >
          X
        </Button>
      </div>
    </>
  );
};

export { Aside };
