import SpinnerSvg from '../../assets/img/Spinner.svg';

const Spinner = () => {
  return (
    <img
      data-testid="spinner"
      className="w-[10%] h-[10%] mx-auto animate-spin"
      src={SpinnerSvg}
      alt="Spinner"
    />
  );
};
export { Spinner };
