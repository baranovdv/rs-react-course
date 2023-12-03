import { nanoid } from '@reduxjs/toolkit';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Result } from '../components/Result';
import { Button } from '../components/ui/Button';
import { ROUTES } from '../data/data';
import { FormType } from '../data/types';
import { useAppSelector } from '../store/hooks';
import { selectResultsStore } from '../store/resultsSlice';

const Main: FC = () => {
  const navigate = useNavigate();

  const resultsArray = useAppSelector(selectResultsStore);

  const createFormHandler = (type: FormType): void => {
    const id = nanoid();
    if (type === 'uncontrolled') {
      navigate(`${ROUTES.uncontrolled}/${id}`);
    }
    if (type === 'reacthook') {
      navigate(`${ROUTES.reacthook}/${id}`);
    }
  };

  const updateFormHandler = (type: FormType, id: string): void => {
    if (type === 'uncontrolled') {
      navigate(`${ROUTES.uncontrolled}/${id}`);
    }
    if (type === 'reacthook') {
      navigate(`${ROUTES.reacthook}/${id}`);
    }
  };

  return (
    <main>
      <h1 className="text-center font-bold text-3xl my-3">Main page</h1>
      <nav className="flex justify-around mt-4 mb-10">
        <Button
          className="w-[30%]"
          onClick={() => createFormHandler('uncontrolled')}
        >
          Create Uncontrolled Form
        </Button>
        <Button
          className="w-[30%]"
          onClick={() => createFormHandler('reacthook')}
        >
          Create Reacthook Form
        </Button>
      </nav>
      <section className="grid grid-cols-1 gap-4 m-4 sm:grid-cols-2">
        {resultsArray.map((result) => {
          return (
            <Result
              key={result.id}
              title={`${result.formType} form`}
              data={result}
              onUpdateClick={() =>
                updateFormHandler(result.formType, result.id)
              }
            />
          );
        })}
      </section>
    </main>
  );
};

export { Main };
