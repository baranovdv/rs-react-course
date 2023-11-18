/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { COMMON_DATA, ERROR_DATA, NUM_OF_API_ITEMS } from '../data/data';
import { Card } from './Card';
import { Spinner } from './misc/Spinner';
import { Pagination } from './ui/Pagination';
import { setSearchQueryToLS } from '../utils/localStorage/localStorage';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  removeCardsIsLoading,
  selectItemsOnPage,
  selectSearchQuery,
  setCards,
  setCardsIsLoading,
} from '../store/cardsSlice';
import { useGetCardsQuery } from '../API/rickAndMortyAPI';
import { ErrorResponse } from '../data/types';
import { useCreateRequest } from '../utils/API/createRequest';

const Content: FC = () => {
  const itemsOnPage = useAppSelector(selectItemsOnPage);
  const searchQuery = useAppSelector(selectSearchQuery);

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const page = Number(
    searchParams.get(COMMON_DATA.pageURLQuery) || ERROR_DATA.pageError
  );

  const { data, isLoading, isSuccess, isError, isFetching, error } =
    useGetCardsQuery(useCreateRequest(page));

  const numOfPages = useRef<number>(1);

  const sliceData = () => {
    const slice = ((page - 1) % (NUM_OF_API_ITEMS / itemsOnPage)) * itemsOnPage;
    return data?.results?.slice(slice, slice + itemsOnPage) || [];
  };

  const handlePageChange = (pageNum: number) => {
    searchParams.set(COMMON_DATA.pageURLQuery, pageNum.toString());
    setSearchParams(searchParams);
  };

  const handleCardDetailsClick = (id: number) => {
    navigate(`details/${id}?page=${page.toString()}`);
  };

  useEffect(() => {
    if (isLoading || isFetching) dispatch(setCardsIsLoading());

    if (isSuccess) {
      dispatch(setCards(sliceData()));
      dispatch(removeCardsIsLoading());
    }

    if (isError) {
      dispatch(setCards(null));
      dispatch(removeCardsIsLoading());
    }
  }, [isSuccess, isError, isLoading, isFetching]);

  if (isLoading) return <Spinner />;

  if (isFetching) return <Spinner />;

  if (isError) {
    if ((error as ErrorResponse).status === ERROR_DATA.notFoundCode) {
      return <div>{COMMON_DATA.notFound}</div>;
    }
    return (
      <div>
        Error:
        {` ${(error as ErrorResponse).status || 0}  ${
          (error as ErrorResponse).data.error || ''
        }`}
      </div>
    );
  }
  if (!data?.results) return <div>{COMMON_DATA.notFound}</div>;

  if (isSuccess) {
    numOfPages.current = Math.ceil((data.info?.count || 0) / itemsOnPage);

    if (numOfPages.current !== 0) {
      setSearchQueryToLS(searchQuery);
    }

    return (
      <>
        <div className="flex flex-col items-center gap-4">
          <Pagination
            page={page}
            onChangePage={handlePageChange}
            numOfPages={numOfPages.current}
          />
          <div className="mx-5 flex flex-wrap justify-around gap-4">
            {sliceData().map((card) => {
              return (
                <Card
                  data={card}
                  key={card.id}
                  onDetailsClick={() => handleCardDetailsClick(card.id)}
                />
              );
            })}
          </div>
          <Pagination
            page={page}
            onChangePage={handlePageChange}
            numOfPages={numOfPages.current}
          />
        </div>
      </>
    );
  }
  return <div>{ERROR_DATA.errorPageMessage}</div>;
};

export { Content };
