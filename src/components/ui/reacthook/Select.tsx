import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface GenericInputProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements['select']> {
  errors: FieldError | undefined;
  array: readonly string[] | number[];
}

const Select = forwardRef<HTMLSelectElement, GenericInputProps>(
  ({ children, errors, array, ...props }, ref) => {
    return (
      <div className={`flex justify-around`}>
        <label
          htmlFor={props.name}
          className="flex w-[30%] justify-end items-center text-2xl"
        >
          {children}
        </label>
        <div className="relative flex flex-col w-[35%]">
          <select
            id={props.name}
            {...props}
            ref={ref}
            className="px-1 border-2 border-red-800 w-fit"
          >
            <option>Select {children}</option>
            {array.map((element) => {
              return (
                <option key={element} value={element}>
                  {element}
                </option>
              );
            })}
          </select>
          {errors && (
            <p className="absolute bottom-[-0.7rem] left-0 whitespace-nowrap text-red-600 text-xs">
              {errors.message}
            </p>
          )}
        </div>
      </div>
    );
  }
);

export { Select };
