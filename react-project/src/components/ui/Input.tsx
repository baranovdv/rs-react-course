import { ChangeEvent, FC } from 'react';

interface InputProps {
  value: string;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  testId?: string;
}

const Input: FC<InputProps> = ({ value, setValue, label, testId }) => {
  return (
    <>
      <label className="flex items-center text-2xl" htmlFor="input">
        {label || ''}
      </label>
      <input
        id="input"
        value={value}
        data-testid={testId}
        onChange={(event) => setValue(event)}
        className="w-[15%] px-1 border-2 border-red-800"
      ></input>
    </>
  );
};

export { Input };
