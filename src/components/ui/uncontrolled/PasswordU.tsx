import React, { forwardRef } from 'react';

interface GenericInputProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {
  error: string | undefined;
  passwordLength: number;
}

const STRENGTH_TITLE = 'Strength: ';

const PasswordU = forwardRef<HTMLInputElement, GenericInputProps>(
  ({ children, error, passwordLength, ...props }, ref) => {
    let strength = 'low';

    if (passwordLength <= 5) strength = 'low';
    if (passwordLength > 8) strength = 'strong';
    if (passwordLength > 5) strength = 'medium';
    if (passwordLength > 10) strength = 'very strong';

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

export { PasswordU };
