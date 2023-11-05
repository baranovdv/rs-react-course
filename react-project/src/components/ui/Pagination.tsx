import { Button } from './Button';

interface PaginationProps {
  page: number;
  onChangePage: (pageNum: number) => void;
  numOfPages: number;
}

export default function Pagination({
  page,
  onChangePage,
  numOfPages,
}: PaginationProps) {
  const onNextHandler = () => {
    onChangePage(page + 1);
  };

  const onPrevHandler = () => {
    onChangePage(page - 1);
  };

  return (
    <div className="flex justify-center gap-2">
      <Button onClick={onPrevHandler} disabled={page === 1}>
        &lt;
      </Button>
      <div className="px-4 py-2 rounded-full border-2 border-red-800 bg-red-100">
        {page}
      </div>
      <Button onClick={onNextHandler} disabled={page === numOfPages}>
        &gt;
      </Button>
    </div>
  );
}
