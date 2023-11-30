import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Result } from '../components/Result';
import { MyFormData } from '../data/types';

const mockData: MyFormData = {
  name: 'Testname',
  age: 66,
  email: 'test@test.ww',
  gender: 'Male',
};

const Main: FC = () => {
  const navigate = useNavigate();

  const UpdateUncontrolledHandler = () => {
    navigate('/uncontrolled');
  };

  const UpdateReacthookHandler = () => {
    navigate('/reacthook');
  };

  return (
    <main>
      <h1 className="text-center font-bold text-3xl my-3">Main page</h1>
      <section className="grid grid-cols-1 gap-4 mx-4 sm:grid-cols-2">
        <Result data={mockData} onUpdateClick={UpdateUncontrolledHandler} />
        <Result data={mockData} onUpdateClick={UpdateReacthookHandler} />
      </section>
    </main>
  );
};

export { Main };
