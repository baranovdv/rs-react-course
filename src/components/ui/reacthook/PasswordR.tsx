import React, { forwardRef, useState } from 'react';

interface GenericInputProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {
  error: string | undefined;
}

const STRENGTH_TITLE = 'Strength: ';

const PasswordR = forwardRef<HTMLInputElement, GenericInputProps>(
  ({ children, error, ...props }, ref) => {
    const [strength, setStrength] = useState('low');

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target?.value.length <= 5) setStrength('low');
      if (event.target?.value.length > 5) setStrength('medium');
      if (event.target?.value.length > 8) setStrength('strong');
      if (event.target?.value.length > 10) setStrength('very strong');
    };

    return (
      <div className={`flex justify-around`}>
        <label
          htmlFor={props.name}
          className="flex w-[30%] justify-end items-center text-2xl"
        >
          {children}
        </label>
        <div className="relative flex flex-col w-[35%]">
          <input
            name={props.name}
            {...props}
            ref={ref}
            onInput={inputHandler}
            className="w-full px-1 border-2 border-red-800"
          />
          <p className="absolute bottom-[-0.7rem] right-[2rem] whitespace-nowrap text-red-600 text-xs">
            {`${STRENGTH_TITLE} ${strength}`}
          </p>
          {error && (
            <p className="absolute bottom-[-0.7rem] left-0 whitespace-nowrap text-red-600 text-xs">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

export { PasswordR };
