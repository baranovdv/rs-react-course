import { FC } from 'react';
import { ERROR_DATA } from '../data/data';

const ErrorPage: FC = () => {
  return (
    <div className="text-center mt-10 text-4xl">
      {ERROR_DATA.errorPageMessage}
    </div>
  );
};

export { ErrorPage };
