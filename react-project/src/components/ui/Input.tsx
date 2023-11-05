import { ChangeEvent } from 'react';

interface InputProps {
  value: string;
  setValue: (s: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export function Input({ value, setValue, label }: InputProps) {
  return (
    <>
      <label className="flex items-center text-2xl" htmlFor="input">
        {label || ''}
      </label>
      <input
        id="input"
        value={value}
        onChange={(e) => setValue(e)}
        className="w-[15%] px-1 border-2 border-red-800"
      ></input>
    </>
  );
}
