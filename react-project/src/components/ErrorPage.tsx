import { FC } from 'react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

import pic404 from '../assets/img/pic404.svg';
import { Button } from './ui/Button';

enum ErrorCodes {
  'NOT_FOUND' = 404,
}

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
        <h1 className="text-2xl text-center">Error page</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{errorMessage}</i>
        </p>
        {errorStatus === ErrorCodes.NOT_FOUND && (
          <img className="w-[120px]" src={pic404} alt="404" />
        )}
        <Link className="py-10" to="/">
          <Button onClick={() => {}}>HOME</Button>
        </Link>
      </div>
    </>
  );
};

export { ErrorPage };
