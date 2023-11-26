import { TEST_DATA } from '../../data/data';
import SpinnerSvg from '../../assets/img/Spinner.svg';

const Spinner = () => {
  return (
    <img
      data-testid={TEST_DATA.SPINNER}
      className="w-[10%] h-[10%] mx-auto animate-spin"
      src={SpinnerSvg}
      alt="Spinner"
    />
  );
};
export { Spinner };
