import { forwardRef, useState } from 'react';
import { UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import { NOT_FOUND } from '../../../data/data';
import { MyInputData } from '../../../data/interfaces';

interface GenericInputProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {
  error: string | undefined;
  initArray: string[];
  setValue: UseFormSetValue<MyInputData>;
  trigger: UseFormTrigger<MyInputData>;
}

const AutocompleteR = forwardRef<HTMLInputElement, GenericInputProps>(
  ({ children, error, initArray, setValue, trigger, ...props }, ref) => {
    const [showCountrySearch, setShowCountrySearch] = useState<boolean>(false);

    const [countrySearch, setCountrySearch] = useState<string[]>(initArray);

    const countryOnFocusHandler = () => setShowCountrySearch(true);

    const countryOnBlurHandler = () => setShowCountrySearch(false);

    const countryOnChangeHandler = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const filter = initArray.filter((country) =>
        country.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setValue('country', event.target.value);
      trigger('country');
      setCountrySearch(filter.length !== 0 ? filter : [NOT_FOUND]);
    };

    const countryClickHandler = (country: string) => {
      setValue('country', country);
      trigger('country');
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
            id={props.name}
            {...props}
            ref={ref}
            onChange={countryOnChangeHandler}
            onFocus={countryOnFocusHandler}
            onBlur={countryOnBlurHandler}
            className="w-full px-1 border-2 border-red-800"
          />
          {showCountrySearch && (
            <ul className="absolute flex flex-col gap-1 top-[1.8rem] left-0 w-full h-fit max-h-40 p-4 pt-2 overflow-scroll bg-[rgba(255,255,255,0.8)] z-10">
              {countrySearch.map((country) => {
                if (country === NOT_FOUND)
                  return (
                    <li key={country} className="relative z-20">
                      {country}
                    </li>
                  );
                return (
                  <li
                    onMouseDown={() => countryClickHandler(country)}
                    key={country}
                    className="relative z-20 cursor-pointer hover:underline"
                  >
                    {country}
                  </li>
                );
              })}
            </ul>
          )}
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

export { AutocompleteR };
