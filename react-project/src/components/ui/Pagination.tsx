import { FC } from 'react';
import { TEST_DATA } from '../../data/data';
import { Button } from './Button';

interface PaginationProps {
  page: number;
  onChangePage: (pageNum: number) => void;
  numOfPages: number;
}

const Pagination: FC<PaginationProps> = ({
  page,
  onChangePage,
  numOfPages,
}) => {
  const isFirstPage: boolean = page === 1;
  const isLastPage: boolean = page === numOfPages;

  const handlePageForward = () => {
    onChangePage(page + 1);
  };

  const handlePageBack = () => {
    onChangePage(page - 1);
  };

  return (
    <div className="flex justify-center gap-2">
      <Button
        onClick={handlePageBack}
        disabled={isFirstPage}
        testId={TEST_DATA.PREV_PAGE}
      >
        &lt;
      </Button>
      <div className="px-4 py-2 rounded-full border-2 border-red-800 bg-red-100">
        {page}
      </div>
      <Button
        onClick={handlePageForward}
        disabled={isLastPage}
        testId={TEST_DATA.NEXT_PAGE}
      >
        &gt;
      </Button>
    </div>
  );
};

export { Pagination };
