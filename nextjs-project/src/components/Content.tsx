import { type ResponseData } from '@/data/types';
import { addQuery } from '@/utils/addQuery';
import { getItemsonPage } from '@/utils/getItemsOnPage';
import { getPage } from '@/utils/getPage';
import { useRouter } from 'next/router';
import { encode } from 'querystring';
import { useTransition, type FC } from 'react';
import { COMMON_DATA, NUM_OF_API_ITEMS } from '../data/data';
import { Card } from './Card';
import { Pagination } from './ui/Pagination';

interface ContentProps {
  data: ResponseData;
}

const Content: FC<ContentProps> = ({ data }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const parsedURLQueryParams = encode(router.query);
  const itemsOnPage = getItemsonPage(parsedURLQueryParams);
  const numOfPages = Math.ceil((data.info?.count ?? 0) / itemsOnPage);

  let page = getPage(parsedURLQueryParams);

  const isPageNumCorrect = page > numOfPages;
  page = isPageNumCorrect ? numOfPages : page;

  const sliceData = () => {
    const slice = ((page - 1) % (NUM_OF_API_ITEMS / itemsOnPage)) * itemsOnPage;
    return data?.results?.slice(slice, slice + itemsOnPage) ?? [];
  };

  const handlePageChange = (pageNum: number) => {
    const query = addQuery(parsedURLQueryParams, 'page', pageNum.toString());

    startTransition(async () => {
      await router.push(query);
    });
  };

  const handleCardDetailsClick = (id: number) => {
    const query = addQuery(parsedURLQueryParams, 'details', id.toString());

    startTransition(async () => {
      await router.push(query);
    });
  };

  if (typeof data?.results === 'undefined')
    return <div>{COMMON_DATA.notFound}</div>;

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <Pagination
          page={page}
          onChangePage={handlePageChange}
          numOfPages={numOfPages}
          disabled={isPending}
        />
        <div className="mx-5 flex flex-wrap justify-around gap-4">
          {sliceData().map((card) => {
            return (
              <Card
                data={card}
                key={card.id}
                onDetailsClick={() => {
                  handleCardDetailsClick(card.id);
                }}
              />
            );
          })}
        </div>
        <Pagination
          page={page}
          onChangePage={handlePageChange}
          numOfPages={numOfPages}
          disabled={isPending}
        />
      </div>
    </>
  );
};

export { Content };
