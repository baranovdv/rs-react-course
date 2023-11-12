/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { COMMON_DATA, ERROR_DATA, NUM_OF_API_ITEMS } from '../data/data';
import { ResponseData } from '../data/types';
import { fetchPage } from '../API/fetchRandM';
import { Card } from './Card';
import { Spinner } from './misc/Spinner';
import { Pagination } from './ui/Pagination';
import { setSearchQueryToLS } from '../utils/localStorage/localStorage';
import { useStore, useStoreDispatch } from '../context/StoreContext';

const Content: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const store = useStore();

  const dispatch = useStoreDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const numOfPages = useRef<number>(1);

  const page = Number(
    searchParams.get(COMMON_DATA.pageURLQuery) || ERROR_DATA.pageError
  );

  const handlePageChange = (pageNum: number) => {
    searchParams.set(COMMON_DATA.pageURLQuery, pageNum.toString());
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const pageNum = Math.ceil((page * store.itemsOnPage) / NUM_OF_API_ITEMS);

    async function fetchPageData(
      query: string,
      pageNum: number
    ): Promise<void> {
      const data: ResponseData = await fetchPage({ query, pageNum });

      const slice =
        ((page - 1) % (NUM_OF_API_ITEMS / store.itemsOnPage)) *
        store.itemsOnPage;

      dispatch({
        type: 'update_content',
        content: data.results?.slice(slice, slice + store.itemsOnPage) || null,
      });

      numOfPages.current = Math.ceil(
        (data.info?.count || 0) / store.itemsOnPage
      );

      if (numOfPages.current !== 0) {
        setSearchQueryToLS(query);
      }

      setIsLoading(false);
    }

    setIsLoading(true);

    fetchPageData(store.searchQuery, pageNum).catch((error: Error) => {
      throw new Error(error.message);
    });
  }, [store.searchQuery, page, store.itemsOnPage]);

  const handleCardDetailsClick = (id: number) => {
    navigate(`details/${id}?page=${page.toString()}`);
  };

  if (isLoading) return <Spinner />;

  if (!store.content) return <div>{COMMON_DATA.notFound}</div>;

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <Pagination
          page={page}
          onChangePage={handlePageChange}
          numOfPages={numOfPages.current}
        />
        <div className="mx-5 flex flex-wrap justify-around gap-4">
          {store.content.map((card) => {
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
};

export { Content };
