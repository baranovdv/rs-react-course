import SpinnerSvg from '../../assets/img/Spinner.svg';

export default function Spinner() {
  return (
    <img
      className="w-[10%] h-[10%] mx-auto animate-spin"
      src={SpinnerSvg}
      alt="Spinner"
    />
  );
}
