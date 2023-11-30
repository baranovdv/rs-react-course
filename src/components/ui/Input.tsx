import { ChangeEvent, FC } from 'react';

interface InputProps {
  value: string;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  className?: string;
  testId?: string;
}

const Input: FC<InputProps> = ({
  value,
  setValue,
  label,
  className,
  testId,
}) => {
  return (
    <div className={`flex justify-around ${className}`}>
      <label
        className="flex w-[30%] justify-end items-center text-2xl"
        htmlFor="input"
      >
        {label || ''}
      </label>
      <input
        id="input"
        value={value}
        data-testid={testId}
        onChange={(event) => setValue(event)}
        className="w-[35%] px-1 border-2 border-red-800"
      ></input>
    </div>
  );
};

export { Input };
