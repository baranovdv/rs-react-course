import { FC } from 'react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import { TEST_DATA } from '../data/data';

import pic404 from '../assets/img/pic404.svg';
import { Button } from './ui/Button';

enum ErrorCodes {
  'NOT_FOUND' = 404,
}

const ERROR_PAGE_CONSTS = {
  TITLE: 'Error page',
  SUBTITLE: 'Sorry, an unexpected error has occurred.',
  BUTTON_LABEL: 'HOME',
};

const ErrorPage: FC = () => {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 0;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
    errorStatus = error.status;
  }
  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-2xl text-center">{ERROR_PAGE_CONSTS.TITLE}</h1>
        <p>{ERROR_PAGE_CONSTS.SUBTITLE}</p>
        <p>
          <i>{errorMessage}</i>
        </p>
        {errorStatus === ErrorCodes.NOT_FOUND && (
          <img
            data-testid={TEST_DATA.IMG_404}
            className="w-[120px]"
            src={pic404}
            alt="404"
          />
        )}
        <Link className="py-10" to="/">
          <Button onClick={() => {}}>{ERROR_PAGE_CONSTS.BUTTON_LABEL}</Button>
        </Link>
      </div>
    </>
  );
};

export { ErrorPage };
