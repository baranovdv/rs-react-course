import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { COMMON_DATA, NUM_OF_API_ITEMS } from '../data/data';
import { ResponseData, ResultData } from '../data/types';
import { fetchPage } from '../API/fetchRandM';
import Card from './Card';
import Spinner from './misc/Spinner';
import Pagination from './ui/Pagination';

interface ContentProps {
  query: string;
  itemsOnPage: number;
}

export default function Content({ query, itemsOnPage }: ContentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get(COMMON_DATA.pageURLQuery) || 0);

  const numOfPages = useRef(1);

  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<ResultData[] | null>(null);

  const onChangePage = (pageNum: number) => {
    searchParams.set(COMMON_DATA.pageURLQuery, pageNum.toString());
    setSearchParams(searchParams);
  };

  const onOpenDetailsHandler = (id: number) => {
    navigate(`details/${id}?page=${page.toString()}`);
  };

  useEffect(() => {
    setIsLoading(true);
    const pageNum = Math.ceil((page * itemsOnPage) / NUM_OF_API_ITEMS);
    fetchPage({ query, pageNum }).then((data: ResponseData) => {
      const slice =
        ((page - 1) % (NUM_OF_API_ITEMS / itemsOnPage)) * itemsOnPage;
      setContent(data.results?.slice(slice, slice + itemsOnPage) || null);
      numOfPages.current =
        Math.ceil((data.info?.count || 0) / itemsOnPage) || 0;
      setIsLoading(false);
    });
  }, [query, page, itemsOnPage]);

  if (isLoading) return <Spinner />;
  if (!content) return <div>{COMMON_DATA.notFound}</div>;
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <Pagination
          page={page}
          onChangePage={onChangePage}
          numOfPages={numOfPages.current}
        />
        <div className="mx-5 flex flex-wrap justify-around gap-4">
          {content &&
            content.map((card) => {
              return (
                <Card
                  data={card}
                  key={card.id}
                  onClickHandler={() => onOpenDetailsHandler(card.id)}
                />
              );
            })}
        </div>
        <Pagination
          page={page}
          onChangePage={onChangePage}
          numOfPages={numOfPages.current}
        />
      </div>
    </>
  );
}
