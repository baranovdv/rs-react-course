import { forwardRef, useRef, useState } from 'react';
import { NOT_FOUND } from '../../../data/data';

interface GenericInputProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {
  error: string | undefined;
  initArray: string[];
}

const AutocompleteU = forwardRef<HTMLInputElement, GenericInputProps>(
  ({ children, error, initArray, ...props }, ref) => {
    const myRef = useRef<HTMLInputElement | null>(null);

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
      setCountrySearch(filter.length !== 0 ? filter : [NOT_FOUND]);
    };

    const countryClickHandler = (country: string) => {
      if (!myRef.current) return;
      myRef.current.value = country;
    };

    if (typeof ref === 'function') {
      ref(myRef.current);
    } else if (ref) {
      ref.current = myRef.current;
    }

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
            ref={myRef}
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

export { AutocompleteU };
