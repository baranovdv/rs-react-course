import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface GenericInputProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {
  errors: FieldError | undefined;
}

const Checkbox = forwardRef<HTMLInputElement, GenericInputProps>(
  ({ children, errors, ...props }, ref) => {
    return (
      <div className={`flex justify-around`}>
        <label
          htmlFor={props.name}
          className="flex w-[30%] justify-end items-center text-2xl"
        >
          {children}
        </label>
        <div className="relative flex flex-col justify-center w-[35%]">
          <input
            type="checkbox"
            name={props.name}
            {...props}
            ref={ref}
            className="w-fit px-1"
          />
          {errors && (
            <p className="absolute bottom-[-0.4rem] left-0 whitespace-nowrap text-red-600 text-xs">
              {errors.message}
            </p>
          )}
        </div>
      </div>
    );
  }
);

export { Checkbox };
