import { forwardRef } from 'react';

interface GenericInputProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {
  error: string | undefined;
}

const UploadImage = forwardRef<HTMLInputElement, GenericInputProps>(
  ({ children, error, ...props }, ref) => {
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
            id={props.name}
            {...props}
            ref={ref}
            className="w-full"
          />
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

export { UploadImage };
