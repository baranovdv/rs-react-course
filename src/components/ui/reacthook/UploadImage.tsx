import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface GenericInputProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {
  errors: FieldError | undefined;
}

const UploadImage = forwardRef<HTMLInputElement, GenericInputProps>(
  ({ children, errors, ...props }, ref) => {
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
            type="file"
            accept="image/png, image/jpeg"
            name={props.name}
            {...props}
            ref={ref}
            className="w-full"
          />
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

export { UploadImage };
