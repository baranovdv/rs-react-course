import { type FC } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const ERROR_PAGE_CONSTS = {
  TITLE: 'Error page',
  SUBTITLE: 'Sorry, an unexpected error has occurred.',
  BUTTON_LABEL: 'HOME',
};

const ErrorPage: FC = () => {
  const errorMessage = 'Unknown error';

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-2xl text-center">{ERROR_PAGE_CONSTS.TITLE}</h1>
        <p>{ERROR_PAGE_CONSTS.SUBTITLE}</p>
        <p>
          <i>{errorMessage}</i>
        </p>
        <Link href="/" className="py-10">
          <Button onClick={() => {}}>{ERROR_PAGE_CONSTS.BUTTON_LABEL}</Button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
